import { devConfig, prodConfig } from '@tickers-app/common/config';
import { Environments } from '@tickers-app/common/src/environments';
import { TickersAppConfig } from '@tickers-app/common/types/TickersAppConfig';

interface WebAppConfig extends TickersAppConfig {
  clientScriptDomain: string;
}
const baseConfig = process.env.NODE_ENV === Environments.DEVELOPMENT
  ? devConfig
  : prodConfig

export const config: WebAppConfig = {
  ...baseConfig,
  clientScriptDomain: process.env.WEB_APP_DOMAIN || baseConfig.domain,
};
