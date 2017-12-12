var webpack = require('webpack');
var merge = require('webpack-merge');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var baseConfig = require('./base.config');
var webpackBaseConfig = require('./webpack.base.config');

var pathUtil = require('../utils/path.util');

var webpackTestConfig = merge(webpackBaseConfig, {

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
        test: /\.css$/,
        include: [
          pathUtil.resolve('src/main/webapp'),
          pathUtil.resolve('src/test/js/unit/specs')
        ],
        exclude: [
          /node_modules/
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