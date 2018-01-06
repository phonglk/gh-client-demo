const webpack = require('webpack');
const path = require('path');

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
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./dist/js/' + 'common-manifest.json')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
}

module.exports = config