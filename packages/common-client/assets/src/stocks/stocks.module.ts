import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { Stock } from './stock.entity';
import { Label } from '../labels/label.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    TypeOrmModule.forFeature([Label]),
  ],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
