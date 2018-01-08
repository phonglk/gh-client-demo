const webpack = require('webpack');
const path = require('path');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const config = {
  entry: './src/index.js',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [ 'style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ],
  },
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  plugins: [
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'gh-client-demo',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: '/js/',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }
    ),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./dist/js/' + 'common-manifest.json')
    }),
  ],
}

module.exports = config