import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

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

  @BeforeInsert()
  @BeforeUpdate()
  private async capitalizeTicker() {
    this.ticker = this.ticker.toUpperCase();
  }
}
