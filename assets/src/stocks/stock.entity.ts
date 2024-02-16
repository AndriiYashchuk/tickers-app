import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { AssetEntity } from '../entities/asset.entity';
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

  @OneToMany(() => Label, (label: Label) => label.stock)
  labels: Label[];
}
