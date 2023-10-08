import { UserPayload } from '@tickers-app/common-server/build/types/UserPayload';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export {}
