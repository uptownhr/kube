const express = require('express'),
  app = express()

require('./reax-middleware')(app)

const mongoose = require('mongoose')



mongoose.connection.on('error', () => {
  console.log('Mongodb connection error')
  process.exit(1)
})

mongoose.connection.on('connected', () => {
  console.log('Mongodb connected')
})


module.exports = {
  app, mongoose
}