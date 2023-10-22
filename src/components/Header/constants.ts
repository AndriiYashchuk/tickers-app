import { Link } from '../../types/Link';

export const BASE_HEADER_OPTIONS = [
  { title: 'dashboard', to: 'web-app' },
  { title: 'about', to: 'about' },
]

const SIGN_IN_OPTION =  { title: 'signin', to: 'signin' };

export const UNAUTHORIZED_HEADER = [
  ...BASE_HEADER_OPTIONS,
  SIGN_IN_OPTION,
];
export const LOGO = { title: 'Tickers', to: '/' }

export const MENU: Link [] = [
  SIGN_IN_OPTION
]

export const AUTHORIZED_HEADER = BASE_HEADER_OPTIONS;
