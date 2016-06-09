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

const app_root = path.dirname(require.main.filename) + 'dist'

module.exports = {
  devtool: 'eval',
  entry: [
    path.join(__dirname, '../src/routes')
  ],
  output: {
    path: path.dirname(require.main.filename) + 'dist',
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
        include: app_root + '../src',
        query: {
          "presets": ["react", "es2015", "stage-0"],
          "plugins": ["transform-decorators-legacy", "add-module-exports"]
        }
      },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.png|svg|jpg$/, loader: 'url-loader?limit=1024' },
      { test: /\.(otf|eot|ttf|woff|woff2)$/, loader: 'file' }
    ]
  },
  plugins: [
  ],
  externals: nodeModules
};