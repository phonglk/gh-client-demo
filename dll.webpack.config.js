const webpack = require('webpack');
const path = require('path');
/* eslint-disable max-len */
/*
"babel-polyfill": "^6.26.0",
"express": "^4.16.2",
"qs": "^6.5.1",
"react": "^16.2.0",
"react-dom": "^16.2.0",
"react-redux": "^5.0.6",
"react-router-dom": "^4.2.2",
"redux": "^3.7.2",
"redux-logger": "^3.0.6",
"redux-thunk": "^2.2.0"
*/
module.exports = {
  entry: {
    common: [
      'babel-polyfill',
      'qs',
      'react', 'react-dom', 'react-redux',
      'react-router-dom',
      'redux','redux-logger', 'redux-thunk',
    ],
  },

  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, './dist/js'),
    library: '[name]_lib',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
    }),
    new webpack.DllPlugin({
      path: './dist/js/[name]-manifest.json',
      name: '[name]_lib',
    }),
  ],
};
