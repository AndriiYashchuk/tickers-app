const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('@tickers-app/common-client/src/webpack/webpack.common');
const sharedModules = require('@tickers-app/common-client/src/webpack/shared');

const mode = process.env.MODE;
const domain = process.env.PRODUCTION_DOMAIN || 'http://localhost:3000';

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
