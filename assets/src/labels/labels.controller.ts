import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LabelsService } from './labels.service';
import { BASE } from '../contants/routes';
import { CurrentUser } from '../decorators/current-user.decorator';
import { LabelDto } from './dtos/label.dto';
import { Label } from './label.entity';
import { JwtUser } from '@tickers-app/common/types/domain/JwtUser';

@Controller(`${BASE}/labels`)
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  @Post()
  createLabel(
    @CurrentUser() user: JwtUser,
    @Body() labelDto: LabelDto,
  ): Promise<Label> {
    if (labelDto.isSystem && !user.isAdmin) {
      throw new ForbiddenException('Only admins can create system labels');
    }
    return this.labelsService.create(labelDto, user.id);
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
    @Query('withSystem') withSystem?: boolean,
  ): Promise<Label[]> {
    return this.labelsService.find(user.id, name, withSystem);
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
