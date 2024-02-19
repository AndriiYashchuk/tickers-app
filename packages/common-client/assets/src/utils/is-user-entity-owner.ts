import { UserOwnerEntity } from '../entities/user-owner.entity';

export const isUserEntityOwner = (
  entity: UserOwnerEntity,
  userId: string,
): boolean => {
  return entity && entity.userId === userId;
};
