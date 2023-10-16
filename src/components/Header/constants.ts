import { Link } from '../../types/Link';

export const UNAUTHORIZED_HEADER = [
  { title: 'dashboard', to: 'web-app' },
  { title: 'about', to: 'about' },
  { title: 'signin', to: 'signin' },
];
export const LOGO = { title: 'Tickers', to: '/' }

export const MENU: Link [] = [
  { title: 'signout', to: 'signout' }
]

export const AUTHORIZED_HEADER = [
  { title: 'dashboard', to: 'web-app' },
  { title: 'about', to: 'about' },
];
