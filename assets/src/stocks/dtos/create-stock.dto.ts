import {
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  MAX_NOTICE_LENGTH,
  MAX_PRICE,
  MAX_TICKER_LENGTH,
  MIN_NOTICE_LENGTH,
  MIN_PRICE,
  MIN_TICKER_LENGTH,
} from '../../contants/min-max-values';

export class CreateStockDto {
  @IsString()
  @MinLength(MIN_TICKER_LENGTH)
  @MaxLength(MAX_TICKER_LENGTH)
  ticker: string;

  @IsInt()
  purchaseDate: number;

  @IsNumber()
  @Min(MIN_PRICE)
  @Max(MAX_PRICE)
  price: number;

  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  @MinLength(MIN_NOTICE_LENGTH)
  @MaxLength(MAX_NOTICE_LENGTH)
  notice?: string;
}
