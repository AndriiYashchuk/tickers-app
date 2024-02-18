import {
  IsString,
  IsBoolean,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import {
  MAX_LABEL_NAME_LENGTH,
  MIN_LABEL_NAME_LENGTH,
} from '../../contants/min-max-values';

export class LabelDto {
  @IsString()
  @MinLength(MIN_LABEL_NAME_LENGTH)
  @MaxLength(MAX_LABEL_NAME_LENGTH)
  name: string;

  @IsOptional()
  @IsBoolean()
  isSystem: boolean;
}
