import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserOwnerEntity } from './user-owner.entity';

export class AssetEntity extends UserOwnerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  label: string;

  @Column({ nullable: true })
  notice: string;
}
