import {
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import {
  MAX_NOTICE_LENGTH,
  MAX_PRICE, MAX_TICKER_LENGTH,
  MIN_NOTICE_LENGTH,
  MIN_PRICE, MIN_TICKER_LENGTH,
} from '../../contants/min-max-values';

export class UpdateStockDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(50)
  id: string;

  @IsString()
  @IsOptional()
  @MinLength(MIN_TICKER_LENGTH)
  @MaxLength(MAX_TICKER_LENGTH)
  ticker?: string;

  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  @MinLength(MIN_NOTICE_LENGTH)
  @MaxLength(MAX_NOTICE_LENGTH)
  notice?: string;

  @IsInt()
  @IsOptional()
  purchaseDate?: number;

  @IsNumber()
  @IsOptional()
  @Min(MIN_PRICE)
  @Max(MAX_PRICE)
  price?: number;
}
