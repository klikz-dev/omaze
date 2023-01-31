const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const scripts = require('./sdg-build/scripts.json');
const paths = require('./sdg-build/paths.json');
const createBuild = require('./webpack/react/createBuild');

// environment
const env = process.env.NODE_ENV;
const isDev = env !== 'production';

const config = {
    mode: env,
    entry: scripts,
    output: {
        filename: isDev ? '[name].js' : '[name].min.js',
        path: path.join(__dirname, paths.pub),
    },
    module: {
        rules: [
            {
                loader: 'eslint-loader',
                test: /\.(js)$/,
                exclude: /node_modules/,
                enforce: 'pre',
            },
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                loader: 'imports-loader?define=>undefined',
                test: /node_modules\/flickity/,
            },
            {
                test: /\.scss/,
                use: [
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.graphql/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
            }),
        ],
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new CopyPlugin([{
            from: `${paths.vendor}**/*`,
            flatten: true,
        }, {
            from: `${paths.fonts}**/*`,
            flatten: true,
        }, {
            from: `${paths.favicons}**/*`,
            flatten: true,
        }, {
            from: `${paths.images}**/*`,
            ignore: [
                `${paths.images}/unused/**/*`,
                `${paths.images}/svg/**/*`,
            ],
            flatten: true,
        }]),
    ],
};

module.exports = [
    config,
    createBuild('ActiveExperienceApp', env),
    createBuild('Auth0UnknownErrorApp', env),
    createBuild('ClosedExperienceApp', env),
    createBuild('CollectionApp', env),
    createBuild('HomepageApp', env),
];
