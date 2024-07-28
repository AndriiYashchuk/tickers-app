import { devConfig, prodConfig } from '@tickers-app/common/config';
import { Environments } from '@tickers-app/common/src/environments';
import { TickersAppConfig } from '@tickers-app/common/types/TickersAppConfig';

export const config: TickersAppConfig = process.env.NODE_ENV === Environments.DEVELOPMENT
  ? devConfig : prodConfig;
