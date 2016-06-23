const fs = require('fs'),
  path = require('path'),
  webpack = require('webpack')

module.exports = function(options){
  return {
    client_config: client_config(options),
    server_config: server_config(options)
  }
}

const client_config = function({kube_path, project_path, src_path, public_path, client_path}){

  return {
    devtool: 'eval',
    entry: [
      'webpack-hot-middleware/client',
      client_path
    ],
    output: {
      path: path.join(public_path, '/dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          include: src_path,
          query: {
            "presets": ["react", "es2015", "stage-0"],
            "plugins": [
              "transform-decorators-legacy",
              "add-module-exports",
              ["transform-react-jsx", { "pragma":"h" }]
            ]
          }
        },
        { test: /\.scss$/, loaders: ["style", "css", "sass"] },
        { test: /\.css$/, loader: "style!css" },
        { test: /\.(png|svg|jpg|gif)$/, loader: 'url-loader?limit=1024' },
        //{ test: /\.(?!(js|scss|css|otf|eot|ttf|woff|woff2))/, loader: 'url-loader?limit=1024' },
        { test: /\.(otf|eot|ttf|woff|woff2)$/, loader: 'file' }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      modulesDirectories: [
        kube_path + '/node_modules',
        project_path + '/node_modules'
      ]
    },
    resolveLoader: {
      modulesDirectories: [
        kube_path + '/node_modules',
        project_path + '/node_modules'
      ]
    }
  };
}

const server_config = function({kube_path, project_path, server_path, src_path}){
  const ExtractTextPlugin = require("extract-text-webpack-plugin"),
    nodeModules = {};

  try{
    let stat = fs.lstatSync(project_path+'/node_modules')
    fs.readdirSync( project_path + '/node_modules')
      .filter(function(x) {
        return ['.bin'].indexOf(x) === -1
      })
      .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
      });
  }catch(e){
    console.log('node_modules directory does not exist')
  }


  return {
    entry: server_path,
    devtool: 'eval',
    output: {
      path:  project_path + '/public/dist',
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
          include: src_path,
          query: {
            "presets": ["react", "es2015", "stage-0"],
            "plugins": [
              "transform-decorators-legacy",
              "add-module-exports",
              ["transform-react-jsx", { "pragma":"h" }]
            ]
          }
        },
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        //{ test: /\.(?!(js|scss|css|otf|eot|ttf|woff|woff2))/, loader: 'url-loader?limit=1024' },
        { test: /\.png|svg|jpg$/, loader: 'url-loader?limit=1024' },
        { test: /\.(otf|eot|ttf|woff|woff2)$/, loader: 'file' }
      ]
    },
    plugins: [
      new ExtractTextPlugin("styles.css"),

    ],
    externals: nodeModules,
    resolve: {
      modulesDirectories: [
        kube_path + '/node_modules',
        project_path + '/node_modules'
      ]
    },
    resolveLoader: {
      modulesDirectories: [
        kube_path + '/node_modules',
        project_path + '/node_modules'
      ]
    }
  }
}