/** @type {import('next').NextConfig} */
const path = require('path');

const presets = [
  '@babel/preset-env',
  '@babel/preset-react',
];

const nextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /node_modules\/@tickers-app\/common-client\//,
      loader: 'babel-loader',
      options: { presets },
    });

    config.module.rules.push({
      test: /\.ts(x?)$/,
      include: path.resolve(__dirname, '../packages/common'),
      use: [
        {
          loader: 'babel-loader',
          options: { presets },
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            allowTsInNodeModules: true,
            logLevel: 'info',
            configFile: path.resolve(__dirname, '../packages/tsconfig.json'),
          }
        }
      ]
    });

    return config;
  }
};

module.exports = nextConfig;
