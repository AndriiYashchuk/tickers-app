/** @type {import('next').NextConfig} */

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

    return config;
  }
};

module.exports = nextConfig;
