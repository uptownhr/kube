const fs = require('fs'),
  path = require('path'),
  webpack = require('webpack')

module.exports = function(options){
  return {
    client_config: client_config(options),
    server_config: server_config(options)
  }
}

const client_config = function({kube_path,project_public_path, project_entry}){
  return {
    devtool: 'eval',
    entry: [
      'webpack-hot-middleware/client',
      project_entry
    ],
    output: {
      path: path.join(project_public_path, '/dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
    },
    module: {
      loaders: [

        {
          test: /\.js$/,
          loader: 'babel',

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
    ],
    resolve: {
      modulesDirectories: [
        kube_path + '/node_modules',
        process.cwd() + '/node_modules'
      ]
    }
  };
}

const server_config = function({kube_path, project_path, project_entry_component, project_routes, project_entry}){
  var ExtractTextPlugin = require("extract-text-webpack-plugin");

  var nodeModules = {};
  fs.readdirSync( project_path + '/node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

  let entry = project_entry_component || project_routes || project_entry

  return {
    entry,
    devtool: 'eval',
    output: {
      path:  kube_path + '/public/dist',
      filename: 'routes.js',
      publicPath: '/dist/',
      libraryTarget: 'commonjs2',
      library: 'routes'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          include: project_path + '/src',
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
    externals: nodeModules,
    resolve: {
      modulesDirectories: [
        kube_path + '/node_modules',
        process.cwd() + '/node_modules'
      ]
    }
  };
}