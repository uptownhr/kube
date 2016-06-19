const React = require('react'),
  server = require('./server'),
  ReactDOMServer = require('react-dom/server'),
  {match, RouterContext} = require('react-router'),
  path = require('path'),
  express = require('express')

module.exports = function(app, options={}) {
  const kube_path = path.resolve(__dirname + '/../'),
    project_path = process.cwd()

  options = make_options(kube_path, project_path, options)
  options.mount = true

  const {dev, hot, ssr, asset} = server(options)

  app.use(dev, hot, ssr, asset)

  return app
}

function make_options(kube_path, project_path, params){
  //get kuberc
  const kuberc = params
  src_path = project_path + '/' + kuberc.src_path

  const options = {
    kube_path,
    project_path,
    src_path,
    client_path: path.resolve( `${kuberc.src_path}/client.js` ),
    server_path: path.resolve( `${kuberc.src_path}/server.js` ),
    layout_path: path.resolve( `${kuberc.src_path}/layout.js` ),
    public_path: path.resolve( `${kuberc.public_path}` ),
    express_handler_path: path.resolve( `${kuberc.src_path}/express_handler.js`),
    debug: kuberc.debug,
    mount: kuberc.mount || false
  }

  return options
}