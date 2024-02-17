import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Stock } from '../stocks/stock.entity';

@Entity()
export class Label {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @ManyToMany(() => Stock, (stock: Stock) => stock.labels)
  stocks: Stock[];
}
