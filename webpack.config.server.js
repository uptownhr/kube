var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


module.exports = {
  devtool: 'eval',
  entry: [
    './src/routes'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'routes.js',
    publicPath: '/static/',
    libraryTarget: 'commonjs2',
    library: 'routes'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel'],
        include: path.join(__dirname, 'src')
      },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.png|svg|jpg$/, loader: 'url-loader' },
      { test: /\.(otf|eot|ttf|woff|woff2)$/, loader: 'file' }
    ]
  },
  plugins: [
  ],
  externals: nodeModules
};