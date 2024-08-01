import { devConfig, local, prodConfig } from '@tickers-app/common/config';
import { Environments } from '@tickers-app/common/src/environments';
import { TickersAppConfig } from '@tickers-app/common/types/TickersAppConfig';

interface WebAppConfig extends TickersAppConfig {
  clientScriptDomain: string;
  clientServiceDomain: string;
}

let baseConfig = null;

switch (process.env.ENV) {
  case Environments.LOCAL:
    baseConfig = local;
    break;
  case Environments.PRODUCTION:
    baseConfig = prodConfig;
    break;
  default:
    baseConfig = devConfig;
    break;
}

export const CONFIG: WebAppConfig = {
  ...baseConfig,
  clientServiceDomain: 'http://client-srv:3000',
  clientScriptDomain: process.env.WEB_APP_DOMAIN || baseConfig.domain,
};
