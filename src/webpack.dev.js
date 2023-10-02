const { merge } = require('webpack-merge');
const commonConfig = require('./webpack/webpack.common');

const PORT = 8080

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

module.exports = merge(commonConfig, devConfig);
