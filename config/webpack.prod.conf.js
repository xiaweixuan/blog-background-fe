const { merge } = require('webpack-merge');
const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

console.log(__dirname);
module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    publicPath: './'
  },
  plugins: [
    // 定义变量
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // hash
    new webpack.HashedModuleIdsPlugin(),
    // 每次删除dist包
    new CleanWebpackPlugin(),
    // 定义html模版
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  optimization: {
    // 压缩css
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
    // 将第三方模块和重用模块分离
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          priority: 1,
          test: /node_modules/,
          minSize: 0,
          minChunks: 1
        },
        common: {
          name: 'common',
          priority: 0,
          minSize: 0,
          minChunks: 2
        }
      }
    }
  }
});