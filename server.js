const webpackDevMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const config = require('./webpack.config')

const compiler = new webpack(config)

const options = {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: './public'
}

module.exports = {
  server: webpackDevMiddleware(compiler, options),
  hot: hotMiddleware(compiler)
}