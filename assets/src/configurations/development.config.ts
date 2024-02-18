import { Config } from './Config';
import commonConfig from './common.config';

const config: Config = {
  ...commonConfig,
  isDevEnv: true,
};

export default config;
