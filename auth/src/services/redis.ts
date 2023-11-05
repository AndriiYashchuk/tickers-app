import { Redis } from 'ioredis';

const IoRedis = require('ioredis');

class RedisClient {
  static instance: RedisClient | null = null;

  private _redis: Redis | null = null;

  init(host: string): RedisClient {
    if (!RedisClient.instance) {
      this._redis = new IoRedis(host);
      RedisClient.instance = this;
    }

    return RedisClient.instance;
  }

  get redis(): Redis | null {
    return this._redis;
  }
}

export const redisClientInstance = new RedisClient();
