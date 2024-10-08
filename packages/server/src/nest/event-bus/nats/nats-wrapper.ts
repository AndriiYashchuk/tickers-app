/* eslint-disable no-underscore-dangle */
import * as nats from 'node-nats-streaming';
import { Stan } from 'node-nats-streaming';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', err => {
        reject(err);
      });
    });
  }
}
