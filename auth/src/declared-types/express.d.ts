import { User } from '@tickers-app/common/types/User';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

export {};
