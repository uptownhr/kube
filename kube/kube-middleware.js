const React = require('react'),
  server = require('./server'),
  ReactDOMServer = require('react-dom/server'),
  {match, RouterContext} = require('react-router'),
  path = require('path'),
  express = require('express')

module.exports = function(app, options={}) {
  const kube_path = path.resolve(__dirname + '/../'),
    project_path = process.cwd()

  const kube_default = {
    kube_path,
    project_path,
    project_entry: project_path + '/src/index.js',
    project_entry_component: false,
    project_routes: project_path + '/src/routes.js',
    project_public_path: project_path + '/public',
    mount: false
  }

  options = Object.assign({},kube_default,options)
  console.log(options)
  const {dev, hot, ssr, asset} = server(options)

  app.use(asset, dev, hot, ssr )

  return app
}