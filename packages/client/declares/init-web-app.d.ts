import { User } from '@tickers-app/common/types/User';

declare global {
  interface Window {
    initWebApp: (props: { currentUser: User | null }) => void;
    onWebAppIsReady: () => void;
  }
}
