import { TickersAppConfig } from './types/TickersAppConfig';

export const devConfig: TickersAppConfig = {
  domain: 'https://tickers-app.dev',
};

export const prodConfig: TickersAppConfig = {
  domain: 'https://tickers-app.com'
};

export const local: TickersAppConfig = {
  domain: 'http://localhost:3000',
};
