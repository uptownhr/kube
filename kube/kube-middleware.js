const server = require('./server'),
  path = require('path'),
  express = require('express')

module.exports = function(app) {
  const kube_path = path.resolve(__dirname + '/../'),
    project_path = process.cwd()

  const kube_default = {
    kube_path,
    project_path,
    project_entry: project_path + '/src/index.js',
    project_entry_component: false,
    project_routes: project_path + '/src/routes.js',
    project_public_path: project_path + '/public'
  }

  let options = {
    project_routes: false,
    project_entry_component: project_path + '/src/components/App.js'
  }

  options = Object.assign({},kube_default,options)

  const {dev, hot, ssr} = server(options)

  app.use(dev, hot, ssr)

  return app
}