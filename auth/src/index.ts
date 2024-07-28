import { withRetry } from '@tickers-app/common/src';

import mongoose from 'mongoose';
import { redisClientInstance } from './services/redis';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async (): Promise<void> => {
  if (!process.env.JWT_KEY) {
    throw new Error('Env variable JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Env variable MONGO_URI must be defined');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  if (!process.env.REDIS_HOST) {
    throw new Error('REDIS_HOST must be defined');
  }

  // setup nats connection
  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
  );
  natsWrapper.client.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });
  process.on('SIGINT', () => natsWrapper.client.close());
  process.on('SIGTERM', () => natsWrapper.client.close());

  // setup mongo db connection
  await mongoose.connect(process.env.MONGO_URI);

  // connect to redis
  redisClientInstance.init(process.env.REDIS_HOST);

  app.listen(3000, () => {
    console.log('Listening on port: 3000');
  });
};

const FIVE_MINUTE = 5 * 60 * 1000;

withRetry(start, FIVE_MINUTE, console.error);
