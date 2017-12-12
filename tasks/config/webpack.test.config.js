var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var _ = require('lodash');

var baseConfig = require('./base.config');
var webpackBaseConfig = require('./webpack.base.config');

var pathUtil = require('../utils/path.util');
var path = require('path');

var webpackBaseConfigWithoutPlugins = _.cloneDeep(webpackBaseConfig);
webpackBaseConfigWithoutPlugins.module.rules = [];
delete webpackBaseConfigWithoutPlugins.entry;

var webpackTestConfig = merge(webpackBaseConfigWithoutPlugins, {

  devtool: 'eval-source-map',
  output: {
    path: pathUtil.resolve(baseConfig.dir.build),
    filename: '[name].test.js',
    chunkFilename: '[id].test.js'
  },
  module: {
    rules: [
      {
        enforce: 'post',
        test: /\.js$/,
        include: [
          pathUtil.resolve('src/app')
        ],
        exclude: [
          /node_modules/,
          /vendor/
        ],
        loader: 'istanbul-instrumenter-loader'
      },
      {
        test: /\.html$/,
        exclude: pathUtil.resolve(baseConfig.dir.src) + path.sep + 'index.html',
        loader: 'ng-cache-loader?prefix=[dir]/[dir]/[dir]'
      },
      {
        test: /\.css$/,
        include: [
          pathUtil.resolve('src'),
          pathUtil.resolve('src/test/unit/specs')
        ],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          useRelativePath: true,
          publicPath: './',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          useRelativePath: false,
          publicPath: './',
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"test"'
      }
    }),
    new HtmlWebpackPlugin({
      template: './' + baseConfig.dir.src + '/index.html',
      favicon: './' + baseConfig.dir.src + '/favicon.ico',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    })
  ],
  stats: {
    colors: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false,
    chunksSort: 'name',
    children: false,
    modules: false,
    reasons: false,
    warnings: true,
    assets: false,
    version: false
  }
});

module.exports = webpackTestConfig;