import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { Stock } from './stock.entity';
import { CurrentUserFromJwtInterceptor } from '../incerceptors/current-user-from-jwt.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  controllers: [StocksController],
  providers: [StocksService, JwtService, CurrentUserFromJwtInterceptor],
})
export class StocksModule {}
