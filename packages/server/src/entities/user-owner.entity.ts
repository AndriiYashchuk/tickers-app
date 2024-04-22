import { Column } from 'typeorm';

export class UserOwnerEntity {
  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;
}
