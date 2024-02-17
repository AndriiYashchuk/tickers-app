import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from './label.entity';
import { LabelDto } from './dtos/label.dto';
import { isUserEntityOwner } from '../utils/is-user-entity-owner';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private repo: Repository<Label>,
  ) {}

  async findAll(userId: string, withSystem?: boolean): Promise<Label[]> {
    const userLabels = await this.repo.find({ where: { userId } });
    if (withSystem) {
      const systemLabels = await this.repo.find({ where: { isSystem: true } });
      return userLabels.concat(systemLabels);
    }

    return userLabels;
  }

  async create(label: LabelDto, userId: string): Promise<Label> {
    const newStock = this.repo.create({ ...label, userId });

    return this.repo.save(newStock);
  }

  async findOne(id: string, userId: string): Promise<Label | null> {
    return this.repo.findOneBy({ id, userId, isSystem: true });
  }

  async find(
    userId: string,
    name?: string,
    withSystem?: boolean,
  ): Promise<Label[]> {
    const query = {
      userId,
      ...(name ? { name: name.toLowerCase() } : {}),
    };
    const userLabels = await this.repo.find({ where: query });

    if (withSystem) {
      const systemLabels = await this.repo.find({ where: { isSystem: true } });

      return userLabels.concat(systemLabels);
    }

    return userLabels;
  }

  async update(
    id: string,
    attrs: Partial<Label>,
    userId: string,
  ): Promise<Label | null> {
    const label = await this.findOne(id, userId);
    if (!label) {
      throw new NotFoundException();
    }

    if (!isUserEntityOwner(label, userId)) {
      throw new NotFoundException();
    }

    Object.assign(label, attrs);
    return this.repo.save(label);
  }

  async remove(id: string, userId: string): Promise<Label | null> {
    const label = await this.findOne(id, userId);
    if (!isUserEntityOwner(label, userId)) {
      throw new NotFoundException();
    }

    return this.repo.remove(label);
  }
}
