import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class AssetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @Column({ nullable: true })
  label: string;

  @Column({ nullable: true })
  notice: string;
}
