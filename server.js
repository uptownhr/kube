const webpackDevMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const config = require('./webpack.config')

//for express actions
const expressConfig = require('./webpack.config.server')
const expressCompiler = new webpack(expressConfig)

expressCompiler.watch({
  aggregateTimeout: 300
}, (err, stats) => {
  if(err) return console.log(err)
  console.log('compiled express watch')
})


const compiler = new webpack(config, function(err,stats){
  let data = stats.toJson({chunk:true})
  console.log(data.modules[253])
  console.log('wtfzz')
})

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