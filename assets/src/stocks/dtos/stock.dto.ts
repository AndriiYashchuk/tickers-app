import { Expose, Transform } from 'class-transformer';
import { Label } from '../../labels/label.entity';

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
  userId: string;

  // eslint-disable-next-line
  @Transform(({ value }) =>
    value
      ? value.map((label: Label) => ({ name: label.name, id: label.id }))
      : [],
  )
  @Expose()
  labels: Label[];

  @Expose()
  notice?: string;
}
