'use strict'

const path = require('path'),
  util = require('../util')

const routePath = path.join(__dirname, './')
const routes = util.generateDirectoryModules(routePath)

module.exports = routes