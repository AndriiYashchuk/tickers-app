export const CONTAINER_PREFIX = '/container/latest';
export const isProd = !!process.env.WEB_APP_DOMAIN;
export const domain = process.env.WEB_APP_DOMAIN || 'http://localhost:3000'
console.log('isProps:', isProd);
console.log('domain:', domain);
