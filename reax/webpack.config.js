var path = require('path');
var webpack = require('webpack');

const app_root = path.dirname(require.main.filename)

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'react-hot',
        include: app_root + '/src'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: app_root +  '/src',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true
    })
  ],
};