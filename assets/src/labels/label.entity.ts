import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Stock } from '../stocks/stock.entity';
import { AssetEntity } from '@tickers-app/server//src/entities/asset.entity';

@Entity()
export class Label extends AssetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @ManyToMany(() => Stock, (stock: Stock) => stock.labels)
  stocks: Stock[];

  @Column({ nullable: true })
  isSystem?: boolean;
}
