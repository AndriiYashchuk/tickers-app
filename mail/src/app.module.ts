import { Module } from '@nestjs/common';
import { devConfig, prodConfig } from '@tickers-app/common/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventBusModule } from './modules/event-bus/event-bus.module';
import { Environments } from '@tickers-app/common/src/environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => process.env.NODE_ENV === Environments.DEVELOPMENT
        ? devConfig
        : prodConfig
      ],
    }),
    EventBusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
