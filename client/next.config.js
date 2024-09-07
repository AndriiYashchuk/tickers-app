/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  transpilePackages: ['@tickers-app/common', '@tickers-app/common-client'],
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tickers-app/common': path.resolve(__dirname, '../packages/common'),
      '@tickers-app/common-client': path.resolve(__dirname, '../packages/client'),
    };

    return config;
  }
};

module.exports = nextConfig;
