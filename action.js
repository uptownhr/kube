const express = require('express'),
  router = express.Router()

const React = require('react'),
  ReactDOMServer = require('react-dom/server'),
  {match, RouterContext} = require('react-router')

router.get('/', (req,res) => {
  let id = require.resolve('./dist/routes')
  if (id) delete require.cache[id]

  const routes = require('./dist/routes')

  match({routes,location:req.url}, (err, redirect, renderProps) => {
    const element = React.createElement(RouterContext, renderProps)
    const template = `<html><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"><body><div id='root'>${ReactDOMServer.renderToString(element)}</div><script src="http://localhost:3000/static/bundle.js"></script></body></html>`.replace(/\s+/g, ' ').trim();
    res.send(template)
  })

})

module.exports = router