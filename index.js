const {uncache}= require('./util')
const express = require('express'),
  app = express(),
  { server, hot } = require('./server')



app.use( server, hot )

let action = require('./action')

app.get('/', action)

app.listen(3000)