#!/usr/local/bin/node
const {addPath} = require('app-module-path')
addPath(process.cwd() + '/node_modules')

const path = require('path'),
  server = require('../kube/server')

const kube_path = path.resolve(__dirname + '/../'),
  project_path = process.cwd()

//get kuberc
const kuberc = require(project_path + '/.kuberc')
const options = {
  kube_path,
  project_path,
  client_entry: path.resolve( project_path + '/' + kuberc.client_entry ),
  server_entry: path.resolve( project_path + '/' + kuberc.server_entry )
}

console.log(options)

const {dev, hot, ssr} = server(options)

const express = require('express'),
  app = express()

app.listen(3000)
app.use(express.static(kube_path + '/public'), dev, hot, ssr)

