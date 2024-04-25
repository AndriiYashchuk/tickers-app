import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const checkIsAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser || !req.currentUser.isAdmin) {
    throw new NotAuthorizedError();
  }

  next();
};
