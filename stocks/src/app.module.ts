import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [UsersModule, StocksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
