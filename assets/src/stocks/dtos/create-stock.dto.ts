import { IsString, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateStockDto {
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
