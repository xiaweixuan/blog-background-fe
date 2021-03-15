const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const apiMocker = require('mocker-api');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dist/react.manifest.json')
    }),
  ],
  stats: 'errors-only',
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: './dist',
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:4000"
      }
    }
    // before(app) {
    //   apiMocker(app, path.resolve('./mock'))
    // }
  }
});