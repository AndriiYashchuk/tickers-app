import { Module } from '@nestjs/common';
import { devConfig, prodConfig } from '@tickers-app/common/config';
import { ConfigModule } from '@nestjs/config';
import { Environments } from '@tickers-app/common/src/environments';
import { TickersAppConfig } from '@tickers-app/common/types/TickersAppConfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventBusModule } from './modules/event-bus/event-bus.module';

const loadConfig = (): TickersAppConfig => {
  if (process.env.NODE_ENV === Environments.PRODUCTION) {
    return prodConfig;
  }

  return devConfig;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfig],
    }),
    EventBusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
