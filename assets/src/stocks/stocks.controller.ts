import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JwtUser } from '@tickers-app/common/types/domain/JwtUser';
import { CreateStockDto } from './dtos/create-stock.dto';
import { StocksService } from './stocks.service';
import { UpdateStockDto } from './dtos/update-stock.dto';
import { StockDto } from './dtos/stock.dto';
import { Serialize } from '../interceptors/serialize.interceptors';
import { CurrentUser } from '../decorators/current-user.decorator';
import { BASE } from '../contants/routes';

@Controller(`${BASE}/stocks`)
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Post()
  createStock(
    @CurrentUser() user: JwtUser,
    @Body() body: CreateStockDto,
  ): Promise<StockDto> {
    return this.stocksService.create(body, user.id);
  }

  @Get('/:id')
  @Serialize(StockDto)
  async findStock(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
  ): Promise<StockDto> {
    const stock = await this.stocksService.findOne(id, user.id);
    if (!stock) {
      throw new NotFoundException(`Stock with id ${id} not found`);
    }

    return stock;
  }

  @Get()
  @Serialize(StockDto)
  findAllStocks(
    @CurrentUser() user: JwtUser,
    @Query('ticker') ticker?: string,
  ): Promise<StockDto[]> {
    return this.stocksService.find(user.id, ticker);
  }

  @Delete('/:id')
  async removeStock(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
  ): Promise<StockDto | null> {
    return this.stocksService.remove(id, user.id);
  }

  @Patch('/:id')
  updateStock(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Body() attrs: UpdateStockDto,
  ): Promise<StockDto | null> {
    return this.stocksService.update(id, attrs, user.id);
  }

  @Put('/:id/labels/:labelId')
  bindLabelToStock(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Param('labelId') labelId: string,
  ): Promise<StockDto | null> {
    return this.stocksService.bindLabelToStock(id, labelId, user.id);
  }

  @Delete('/:id/labels/:labelId')
  unbindLabelFromStock(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Param('labelId') labelId: string,
  ): Promise<StockDto | null> {
    return this.stocksService.unbindLabelFromStock(id, labelId, user.id);
  }
}
