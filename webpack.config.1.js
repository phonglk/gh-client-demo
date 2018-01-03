const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    './src/index.js'
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: 9000,
    hot: true,
  }

}
// if (process.env.NODE_ENV === 'production') {
//   config.devtool = "cheap-module-source-map"
//   config.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true
//     }),
//     new webpack.optimize.AggressiveMergingPlugin({
//       minSizeReduce: 1,
//       moveToParents: true
//     })
//   )

// } else {
//   config.devtool = "cheap-module-eval-source-map"
//   config.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true
//     })
//   )
// }

module.exports = config