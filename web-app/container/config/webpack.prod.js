const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('@tickers-app/common-client/src/webpack/webpack.common');
const sharedModules = require('@tickers-app/common-client/src/webpack/shared');

const mode = process.env.MODE;
const isDevMode = mode === 'development'
const domain = isDevMode ? `http://localhost:3000` : process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: mode || 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: `${domain}/container/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: sharedModules,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);