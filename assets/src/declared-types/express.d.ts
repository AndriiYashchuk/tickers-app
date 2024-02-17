import { JwtUser } from '../types/JwtUser';

// TODO: need to move in common lib
declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtUser;
    }
  }
}
