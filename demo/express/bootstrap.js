const express = require('express'),
  app = express()

require('./kube/kube-middleware')(app)


module.exports = {
  app, mongoose
}
