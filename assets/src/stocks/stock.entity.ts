import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AssetEntity } from '../entities/asset.entity';
// eslint-disable-next-line import/no-cycle
import { Label } from '../labels/label.entity';

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

  @ManyToMany(() => Label, (label: Label) => label.stocks)
  @JoinTable()
  labels: Label[];
}
