import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { AssetEntity } from '../entities/asset.entity';

@Entity()
export class Stock extends AssetEntity {
  @Column()
  ticker: string;

  @Column({ name: 'purchase_date' })
  purchaseDate: number;

  @Column({ type: 'double' })
  price: number;

  @BeforeInsert()
  @BeforeUpdate()
  private async capitalizeTicker(): Promise<void> {
    this.ticker = this.ticker.toUpperCase();
  }
}
