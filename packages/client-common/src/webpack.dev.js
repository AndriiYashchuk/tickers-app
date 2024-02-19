const { merge } = require('webpack-merge');
const commonConfig = require('./webpack/webpack.common');

const PORT = 8080

const tsLoaderOptions = {
  configFile: 'tsconfig-dev.json',
  transpileOnly: false,
  logLevel: 'info',
};

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: '/src/playground/index.tsx',
  devServer: {
    port: PORT,
    open: true,
    historyApiFallback: {
      index: 'index.html',
    },
    client: {
      overlay: false
    },
  },
  output:{
    publicPath: `http://localhost:${PORT}/`
  },
};
const mergedConfig = merge(commonConfig, devConfig);
// was changed ts-loader options to use tsconfig-dev.json
mergedConfig.module.rules[3].use[1].options = tsLoaderOptions
module.exports = mergedConfig;
