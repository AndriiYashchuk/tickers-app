import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateStockDto } from './dtos/create-stock.dto';
import { StocksService } from './stocks.service';
import { UpdateStockDto } from './dtos/update-stock.dto';
import { StockDto } from './dtos/stock.dto';
import { Serialize } from '../incerceptors/serialize.interceptors';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../types/User';

@Controller('/api/assets/stocks')
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Post()
  createStock(
    @CurrentUser() user: User,
    @Body() body: CreateStockDto,
  ): Promise<StockDto> {
    return this.stocksService.create(body, user.id);
  }

  @Get('/:id')
  @Serialize(StockDto)
  async findStock(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<StockDto | null> {
    const stock = await this.stocksService.findOne(id, user.id);
    if (!stock) {
      throw new NotFoundException(`Stock with id ${id} not found`);
    }

    return stock;
  }

  @Get()
  @Serialize(StockDto)
  findAllStocks(
    @CurrentUser() user: User,
    @Query('ticker') ticker?: string,
  ): Promise<StockDto[]> {
    return this.stocksService.find(user.id, ticker);
  }

  @Delete('/:id')
  async removeStock(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<StockDto | null> {
    return this.stocksService.remove(id, user.id);
  }

  @Patch('/:id')
  async updateStock(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() attrs: UpdateStockDto,
  ): Promise<StockDto | null> {
    return this.stocksService.update(id, attrs, user.id);
  }
}
