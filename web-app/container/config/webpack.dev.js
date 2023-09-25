const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const PORT = 8080

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: PORT,
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
      name: 'container',
      remotes: {
        dashboard: 'dashboard@http://localhost:8081/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
