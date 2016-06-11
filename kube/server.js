const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const kubeSSR = require('./kube-ssr-middleware')
const webpack_config = require('../kube/webpack.config')

module.exports = function(options){
  const { client_config, server_config } = webpack_config(options)
  const client_compiler = new webpack(client_config)
  const server_compiler = new webpack(server_config)

  const client_options = {
    publicPath: client_config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }

  const server_options = {
    aggregateTimeout: 300
  }

  server_compiler.watch(server_options, function(err, stats){
    if(err) return console.log(err)
    console.log('server compiled')
  })

  return {
    dev: webpackDevMiddleware(client_compiler, client_options),
    hot: hotMiddleware(client_compiler),
    ssr: kubeSSR(options)
  }
}

function server_compiler(){
  const ExtractTextPlugin = require("extract-text-webpack-plugin");

  var nodeModules = {};
  fs.readdirSync( app_root + '/node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });
}


