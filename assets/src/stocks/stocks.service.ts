import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { CreateStockDto } from './dtos/create-stock.dto';

@Injectable()
export class StocksService {
  constructor(@InjectRepository(Stock) private repo: Repository<Stock>) {}

  async findAll(): Promise<Stock[]> {
    return this.repo.find();
  }

  async create(stock: CreateStockDto): Promise<Stock> {
    const newStock = this.repo.create(stock);

    return this.repo.save(newStock);
  }

  async findOne(id: string): Promise<Stock | null> {
    return this.repo.findOneBy({ id });
  }

  async find(userId: string, ticker?: string): Promise<Stock[]> {
    const query = {
      userId,
      ...(ticker ? { ticker: ticker.toUpperCase() } : {}),
    };
    return this.repo.find({ where: query });
  }

  async update(id: string, attrs: Partial<Stock>): Promise<Stock | null> {
    const stock = await this.findOne(id);
    if (!stock) {
      throw new Error(`stock with ${id} not found`);
    }

    Object.assign(stock, attrs);
    return this.repo.save(stock);
  }

  async remove(id: string): Promise<Stock | null> {
    const stock = await this.findOne(id);
    if (!stock) {
      throw new Error(`stock with id ${id} not found`);
    }

    return this.repo.remove(stock);
  }
}
