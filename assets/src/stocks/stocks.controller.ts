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
  UseInterceptors,
} from '@nestjs/common';
import { CreateStockDto } from './dtos/create-stock.dto';
import { StocksService } from './stocks.service';
import { UpdateStockDto } from './dtos/update-stock.dto';
import { StockDto } from './dtos/stock.dto';
import { Serialize } from '../incerceptors/serialize.interceptors';
import { CurrentUserFromJwtInterceptor } from '../incerceptors/current-user-from-jwt.interceptor';

@Controller('/api/assets/stocks')
@UseInterceptors(CurrentUserFromJwtInterceptor)
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Post()
  createStock(@Body() body: CreateStockDto): Promise<StockDto> {
    return this.stocksService.create(body);
  }

  @Get('/:id')
  @Serialize(StockDto)
  async findStock(@Param('id') id: string): Promise<StockDto | null> {
    const stock = await this.stocksService.findOne(id);
    if (stock) {
      throw new NotFoundException(`Stock with id ${id} not found`);
    }

    return stock;
  }

  @Get()
  @Serialize(StockDto)
  findAllStocks(
    @Query('userId') userId: string,
    @Query('ticker') ticker: string,
  ): Promise<StockDto[]> {
    return this.stocksService.find(userId, ticker);
  }

  @Delete('/:id')
  removeStock(@Param('id') id: string): Promise<StockDto | null> {
    try {
      return this.stocksService.remove(id);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Patch('/:id')
  updateStock(
    @Param('id') id: string,
    @Body() attrs: UpdateStockDto,
  ): Promise<StockDto | null> {
    try {
      return this.stocksService.update(id, attrs);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
