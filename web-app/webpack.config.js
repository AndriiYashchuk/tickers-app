// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;

const babelOptions = {
    presets: [
        ['@babel/preset-env', { targets: '> 0.05%, not dead' }],
        '@babel/preset-typescript',
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining'
    ]
};

const config = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, '../client/public/dist'),
        filename: '[name].[hash].js'
    },
    devServer: {
        open: true,
        host: 'localhost',
        client: {
            overlay: false
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        new MiniCssExtractPlugin(),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/

            {
                test: /\.ts(x?)$/,
                exclude: [/node_modules(?!\/sn-front[.-])/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions,
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: isProduction,
                            logLevel: 'info',
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: babelOptions,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }

    if (!isProduction) {
        config.devtool = 'source-map';
    }

    return config;
};
