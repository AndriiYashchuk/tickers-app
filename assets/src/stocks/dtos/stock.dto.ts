import { Expose } from 'class-transformer';

export class StockDto {
  @Expose()
  id: string;

  @Expose()
  ticker: string;

  @Expose()
  purchaseDate: number;

  @Expose()
  price: number;

  @Expose()
  label: string;

  @Expose()
  notice: string;
}
