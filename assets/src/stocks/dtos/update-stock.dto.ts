import { IsString, IsOptional, IsInt, IsNumber } from 'class-validator';

export class UpdateStockDto {
  @IsString()
  @IsOptional()
  ticker: string;

  @IsString()
  @IsOptional()
  label: string;

  @IsString()
  @IsOptional()
  notice: string;

  @IsInt()
  @IsOptional()
  purchaseDate: number;

  @IsNumber()
  @IsOptional()
  price: number;
}
