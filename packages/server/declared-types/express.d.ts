import { UserPayload } from '../src/types/UserPayload';


declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export {}
