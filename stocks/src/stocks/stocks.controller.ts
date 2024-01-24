import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStockDto } from './dtos/create-stock.dto';

@Controller('/api/stocks')
export class StocksController {
  @Get()
  getStocks(): [] {
    return [];
  }

  @Post()
  createStock(@Body() body: CreateStockDto) {
    console.log(body);
  }
}
