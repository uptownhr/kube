#!/usr/local/bin/node
const {addPath} = require('app-module-path'),
  path = require('path'),
  program = require('commander'),
  fs = require('fs-extra'),
  version = require('../package.json').version



const server = require('../kube/server')
const kube_path = path.resolve(__dirname + '/../')

addPath(process.cwd() + '/node_modules')
addPath(kube_path + '/node_modules')

program.command('init [project-name]')
  .description('initialize a kube project')
  .option('-b, --boiler [type]', 'specify boilerplate [router, router-redux]')
  .action( (project_name,options) => {
    console.log('initializing kube', project_name)

    const available_boilers = [ 'router', 'router-redux' ]
    const boiler = options.boiler || 'router'

    if(!available_boilers.includes(options.boiler)){
      return console.log('Invalid boiler specified')
    }

    let project_path = process.cwd()

    if(project_name){
      project_path += '/' + project_name

      try{
        fs.lstatSync(project_path)
        return console.log('project directory already exists')
      }catch(e) {
        createDir(project_path)
      }
    }

    if(kubercExists()) {
      return console.log('already initialized')
    }

    let kuberc_path = project_path + '/.kuberc',
      public_path = project_path + '/public',
      src_path = project_path + '/src'

    makeRC(kuberc_path)

    if(!fs.existsSync(public_path)){
      console.log('not exists')
      createDir(public_path)
    } else{
      console.log('exists')
    }

    createSRC(src_path, boiler)

    /*if(project_name){
      try{
        fs.lstatSync(project_path + '/' + project_name)
        return console.log('project directory already exists')
      }catch(e){
        createDir(project_path + '/' + project_name)

      }
    }else{
      if(kubercExists()){
        return console.log('already ')
      }else{

        makeRC(project_path + '/.kuberc')
        createDir(project_path + '/public')
        createSRC(project_path + '/src')
      }
    }*/
  })

program.command('up')
  .description('start kube server')
  .option('-p, --port [port]', 'Specify kube server port. defaults to 3000')
  .option('-d', 'Start kube server in daemon mode')
  .action( ({D, port}) => {
    console.log(D, port)
    if (!kubercExists()) return console.log('Please run init first')

    up()
  })

program.version(version)
program.parse(process.argv)

if (process.argv.length == 2) {
  program.help();
}

function kubercExists(){
  try{
    fs.lstatSync(process.cwd() + '/.kuberc')
    return true
  }catch(e){
    return false
  }
}

function up(){
  const options = make_options(kube_path)
  const {asset, dev, hot, ssr} = server(options)

  const express = require('express'),
    app = express()

  app.listen(3000, () => console.log('listening at 3000'))

  app.use(dev, hot, ssr, asset)

  function make_options(kube_path){
    const project_path = process.cwd()

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
}

function createDir(path){
  fs.mkdirSync(path)
  console.log('directory created', path)
}

function makeRC(path){
  fs.copySync( __dirname + '/boilerplate/.kuberc', path)
  console.log('default .kuberc created')
}

function createSRC(path, boiler){
  fs.copySync( __dirname + `/boilerplate/${boiler}`, path)
  console.log(boiler, 'boilerplate copied')
}