import { Module } from '@nestjs/common';
import { NatsModule } from '@tickers-app/server/src/nest/event-bus/nats/nats.module';
import { EventBusService } from './event-bus.service';

@Module({
  providers: [EventBusService],
  imports: [NatsModule],
  exports: [EventBusService],
})
export class EventBusModule {}
