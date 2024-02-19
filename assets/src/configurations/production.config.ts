import { Config } from './Config';
import commonConfig from './common.config';

const config: Config = {
  ...commonConfig,
  isProduction: true,
};

export default config;
