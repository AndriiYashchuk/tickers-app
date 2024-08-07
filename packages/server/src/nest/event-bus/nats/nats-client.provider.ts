import { Stan } from 'node-nats-streaming';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { NatsWrapper } from './nats-wrapper';

export const natsClientProvider: Provider = {
  provide: 'NATS_CLIENT',
  useFactory: async (natsWrapper: NatsWrapper): Promise<Stan> => {
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error('NATS_CLIENT_ID must be defined');
    }

    if (!process.env.NATS_URL) {
      throw new Error('NATS_URL must be defined');
    }

    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error('NATS_CLUSTER_ID must be defined');
    }

    if (!process.env.EMAIL || !process.env.EMAIL_KEY) {
      throw new Error('There isn`t emails configuration. Needs process.env.EMAIL and process.env.EMAIL_KEY');
    }

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    return natsWrapper.client;
  },
  inject: [NatsWrapper, ConfigService],
};
