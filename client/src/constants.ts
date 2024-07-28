import { config } from './config';
import { Environments } from '@tickers-app/common/src/environments';

export const CONTAINER_PREFIX = '/container/latest';
export const domain = process.env.NODE_ENV === Environments.DEVELOPMENT
  ? '/api/main-script'
  : config.domain;
export const signinLink = '/signin';
export const signupLink = '/signup';
export const recaptchaPublicApiKey = '6LcXfbIoAAAAAPrSkbCMp-dunfXe33QnkcByKAIw';
