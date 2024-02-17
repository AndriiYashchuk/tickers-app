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
import { LabelsService } from './labels.service';
import { BASE } from '../contants/routes';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtUser } from '../types/JwtUser';
import { LabelDto } from './dtos/label.dto';
import { Label } from './label.entity';

@Controller(`${BASE}/labels`)
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  @Post()
  createLabel(
    @CurrentUser() user: JwtUser,
    @Body() body: LabelDto,
  ): Promise<Label> {
    return this.labelsService.create(body, user.id);
  }

  @Get('/:id')
  async findLabel(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
  ): Promise<Label | null> {
    const label = await this.labelsService.findOne(id, user.id);
    if (!label) {
      throw new NotFoundException(`Label with id ${id} not found`);
    }

    return label;
  }

  @Get()
  findAllLabels(
    @CurrentUser() user: JwtUser,
    @Query('name') name?: string,
  ): Promise<Label[]> {
    return this.labelsService.find(user.id, name);
  }

  @Delete('/:id')
  async removeLabel(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
  ): Promise<Label | null> {
    return this.labelsService.remove(id, user.id);
  }

  @Patch('/:id')
  async updateLabel(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Body() attrs: LabelDto,
  ): Promise<Label | null> {
    return this.labelsService.update(id, attrs, user.id);
  }
}
