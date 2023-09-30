const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('@tickers-app/common-client/src/webpack/webpack.common');
const sharedModules = require('@tickers-app/common-client/src/webpack/shared');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 8081;

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 8081,
    open: true,
    historyApiFallback: {
      index: 'index.html',
    },
    client: {
      overlay: false
    }
  },
  output:{
    publicPath: `http://localhost:${PORT}/`
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
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
