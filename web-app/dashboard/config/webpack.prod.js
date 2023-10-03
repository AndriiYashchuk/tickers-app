const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('@tickers-app/common-client/src/webpack/webpack.common');
const sharedModules = require('@tickers-app/common-client/src/webpack/shared');

const mode = process.env.MODE;
const isDevMode = mode === 'development'
const domain = process.env.PRODUCTION_DOMAIN || 'http://localhost:3000';

const prodConfig = {
  mode: mode || 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: `${domain}/dashboard/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      shared: sharedModules,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
