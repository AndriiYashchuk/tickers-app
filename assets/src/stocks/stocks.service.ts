import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { Label } from '../labels/label.entity';
import { CreateStockDto } from './dtos/create-stock.dto';
import { isUserEntityOwner } from '../utils/is-user-entity-owner';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private stocksRepo: Repository<Stock>,
    @InjectRepository(Label)
    private labelsRepo: Repository<Label>,
  ) {}

  findAll(userId: string): Promise<Stock[]> {
    return this.stocksRepo.find({ where: { userId } });
  }

  create(stock: CreateStockDto, userId: string): Promise<Stock> {
    const newStock = this.stocksRepo.create({ ...stock, userId });

    return this.stocksRepo.save(newStock);
  }

  findOne(id: string, userId: string): Promise<Stock | null> {
    return this.stocksRepo.findOne({
      where: { id, userId },
      relations: ['labels'],
    });
  }

  findOneBy(id: string, userId: string): Promise<Stock | null> {
    return this.stocksRepo.findOneBy({ id, userId });
  }

  find(userId: string, ticker?: string): Promise<Stock[]> {
    const query = {
      userId,
      ...(ticker ? { ticker: ticker.toUpperCase() } : {}),
    };
    return this.stocksRepo.find({ where: query, relations: ['labels'] });
  }

  async update(
    id: string,
    attrs: Partial<Stock>,
    userId: string,
  ): Promise<Stock | null> {
    const stock = await this.findOneBy(id, userId);
    if (!stock) {
      throw new NotFoundException();
    }

    if (!isUserEntityOwner(stock, userId)) {
      throw new NotFoundException();
    }

    Object.assign(stock, attrs);
    return this.stocksRepo.save(stock);
  }

  async remove(id: string, userId: string): Promise<Stock | null> {
    const stock = await this.findOneBy(id, userId);
    if (!isUserEntityOwner(stock, userId)) {
      throw new NotFoundException();
    }

    return this.stocksRepo.remove(stock);
  }

  async bindLabelToStock(
    stockId: string,
    labelId: string,
    userId: string,
  ): Promise<Stock> {
    const stock = await this.findOne(stockId, userId);
    if (!stock) {
      throw new NotFoundException(`Stock with id: ${stockId} not found`);
    }

    const label = await this.labelsRepo.findOneBy({ id: labelId, userId });
    if (!label) {
      throw new NotFoundException(`Label with id ${labelId} not found`);
    }

    if (stock.labels) {
      stock.labels.push(label);
    } else {
      stock.labels = [label];
    }

    return this.stocksRepo.save(stock);
  }

  async unbindLabelFromStock(
    stockId: string,
    labelId: string,
    userId: string,
  ): Promise<Stock> {
    const stock = await this.findOne(stockId, userId);

    if (!stock) {
      throw new NotFoundException(`Stock with id: ${stockId} not found`);
    }

    const label = await this.labelsRepo.findOneBy({ id: labelId, userId });
    if (!label) {
      throw new NotFoundException(`Label with id ${labelId} not found`);
    }

    const labelIndex = stock.labels.findIndex(
      (lab: Label): boolean => lab.id === labelId,
    );

    if (labelIndex < 0) {
      throw new NotFoundException(
        `Stock doesn't have Label with id ${labelId}`,
      );
    }

    stock.labels.splice(labelIndex, 1);
    return this.stocksRepo.save(stock);
  }
}
