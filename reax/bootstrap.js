const express = require('express'),
  app = express(),
  reaxMiddleware = require('./reax-middleware'),
  { server, hot } = require('./server')

const mongoose = require('mongoose')



mongoose.connection.on('error', () => {
  console.log('Mongodb connection error')
  process.exit(1)
})

mongoose.connection.on('connected', () => {
  console.log('Mongodb connected')
})

app.use( server, hot )
app.use( reaxMiddleware )

module.exports = {
  app, mongoose
}