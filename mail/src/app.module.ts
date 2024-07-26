import { Module } from '@nestjs/common';
import { devConfig, prodConfig } from '@tickers-app/common/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventBusModule } from './modules/event-bus/event-bus.module';


const config =
  process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
    EventBusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
