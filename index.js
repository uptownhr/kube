const {uncache}= require('./util')
const express = require('express'),
  app = express(),
  { server, hot } = require('./server')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/preax")

mongoose.connection.on('error', () => {
  console.log('Mongodb connection error')
  process.exit(1)
})

mongoose.connection.on('connected', () => {
  console.log('Mongodb connected')
})

app.use( server, hot )

let action = require('./action')

app.get('/', action)

app.listen(3000)