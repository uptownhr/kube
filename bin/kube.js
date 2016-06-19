#!/usr/local/bin/node
const {addPath} = require('app-module-path'),
  path = require('path')

addPath(process.cwd() + '/node_modules')

const server = require('../kube/server')

const kube_path = path.resolve(__dirname + '/../'),
  project_path = process.cwd()


const options = make_options(kube_path, project_path)

const {asset, dev, hot, ssr} = server(options)

const express = require('express'),
  app = express()

app.listen(3000, () => console.log('listening at 3000'))

app.use(dev, hot, ssr, asset)

function make_options(kube_path, project_path){
  //get kuberc
  const kuberc = require(project_path + '/.kuberc'),
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
    debug: kuberc.debug
  }

  return options
}