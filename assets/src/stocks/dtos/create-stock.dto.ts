import {
  IsString,
  IsInt,
  IsNumber,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateStockDto {
  @IsMongoId()
  userId: string;

  @IsString()
  ticker: string;

  @IsInt()
  purchaseDate: number;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  notice?: string;
}
