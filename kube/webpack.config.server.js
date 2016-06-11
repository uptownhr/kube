var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

const app_root = path.dirname(require.main.filename)

var nodeModules = {};
fs.readdirSync( app_root + '/node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = {
  devtool: 'eval',
  entry: [
    app_root + '/src/routes'
  ],
  output: {
    path: app_root + '/dist',
    filename: 'routes.js',
    publicPath: '/static/',
    libraryTarget: 'commonjs2',
    library: 'routes'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: app_root + '/src',
        query: {
          "presets": ["react", "es2015", "stage-0"],
          "plugins": ["transform-decorators-legacy", "add-module-exports"]
        }
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.png|svg|jpg$/, loader: 'url-loader?limit=1024' },
      { test: /\.(otf|eot|ttf|woff|woff2)$/, loader: 'file' }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ],
  externals: nodeModules
};