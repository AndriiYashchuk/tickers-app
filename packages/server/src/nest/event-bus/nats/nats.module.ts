import { Module } from '@nestjs/common';
import { natsClientProvider } from './nats-client.provider';
import { NatsWrapper } from './nats-wrapper';

@Module({
  providers: [
    natsClientProvider,
    NatsWrapper
  ],
  exports: [natsClientProvider, NatsWrapper],
})
export class NatsModule {}
