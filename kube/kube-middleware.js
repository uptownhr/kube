const React = require('react'),
  {server, hot} = require('./server'),
  ReactDOMServer = require('react-dom/server'),
  {match, RouterContext} = require('react-router'),
  path = require('path'),
  express = require('express')

/*module.exports = function(app){
  app.use(server,hot,kubeMiddleware, express.static(kube_path + '/dist'))

  return app
}*/


module.exports = function(app, options) {
/*  const kube_path = path.resolve(__dirname + '/../'),
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
  }*/




  app.use(kubeMiddleware)

  return app
}