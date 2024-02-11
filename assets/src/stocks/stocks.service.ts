import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { CreateStockDto } from './dtos/create-stock.dto';
import { isUserEntityOwner } from '../utils/is-user-entity-owner';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private repo: Repository<Stock>,
  ) {}

  async findAll(userId: string): Promise<Stock[]> {
    return this.repo.find({ where: { userId } });
  }

  async create(stock: CreateStockDto, userId: string): Promise<Stock> {
    const newStock = this.repo.create({ ...stock, userId });

    return this.repo.save(newStock);
  }

  async findOne(id: string, userId: string): Promise<Stock | null> {
    return this.repo.findOneBy({ id, userId });
  }

  async find(userId: string, ticker?: string): Promise<Stock[]> {
    const query = {
      userId,
      ...(ticker ? { ticker: ticker.toUpperCase() } : {}),
    };
    return this.repo.find({ where: query });
  }

  async update(
    id: string,
    attrs: Partial<Stock>,
    userId: string,
  ): Promise<Stock | null> {
    const stock = await this.findOne(id, userId);
    if (!stock) {
      throw new NotFoundException();
    }

    if (!isUserEntityOwner(stock, userId)) {
      throw new NotFoundException();
    }

    Object.assign(stock, attrs);
    return this.repo.save(stock);
  }

  async remove(id: string, userId: string): Promise<Stock | null> {
    const stock = await this.findOne(id, userId);
    if (!isUserEntityOwner(stock, userId)) {
      throw new NotFoundException();
    }

    return this.repo.remove(stock);
  }
}
