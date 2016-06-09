const express = require('express'),
  router = express.Router()

const React = require('react'),
  ReactDOMServer = require('react-dom/server'),
  {match, RouterContext} = require('react-router')

router.get('/', (req,res) => {
  const routes = require('./src/routes')

  match({routes,location:req.url}, (err, redirect, renderProps) => {
    const element = React.createElement(RouterContext, renderProps)
    const template = `<html><body><div id='root'>${ReactDOMServer.renderToString(element)}</div><script src="http://localhost:3000/static/bundle.js"></script></body></html>`.replace(/\s+/g, ' ').trim();
    res.send(template)
  })

})

module.exports = router