import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @Column()
  ticker: string;

  @Column({ name: 'purchase_date' })
  purchaseDate: number;

  @Column({ type: 'double' })
  price: number;

  @Column({ nullable: true })
  label: string;

  @Column({ nullable: true })
  notice: string;
}
