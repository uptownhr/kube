#!/usr/local/bin/node
const {addPath} = require('app-module-path')
addPath(process.cwd() + '/node_modules')

const path = require('path'),
  server = require('../kube/server')

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
options = {}
options = Object.assign({},kube_default,options)



const {dev, hot, ssr} = server(options)

const express = require('express'),
  app = express()

app.listen(3000)
app.use(express.static(kube_path + '/public'), dev, hot, ssr)

