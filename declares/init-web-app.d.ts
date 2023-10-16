import { User } from '@tickers-app/common/types/User';

declare global {
  interface initWebApp {
    initWebApp: ({ currentUser }: { currentUser: User | null }) => void
  }
}
