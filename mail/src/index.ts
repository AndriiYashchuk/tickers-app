import { withRetry } from '@tickers-app/common';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { UserCreatedListener } from './events/listeners/user-created-listener';
import {
  UserResendEmailConfirmationListener
} from './events/listeners/user-resend-email-confirmation-listener';

const start = async (): Promise<void> => {
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

  // setup listeners
  new UserCreatedListener(natsWrapper.client).listen();
  new UserResendEmailConfirmationListener(natsWrapper.client).listen();

  app.listen(3000, () => {
    console.log('Listening on port: 3000');
  });
};

const FIVE_MINUTE = 5 * 60 * 1000;

withRetry(start, FIVE_MINUTE, console.error);
