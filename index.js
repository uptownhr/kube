require('babel-register')
const express = require('express'),
  app = express(),
  { server, hot } = require('./server')

app.use( server, hot )

const React = require('react'),
  ReactDOMServer = require('react-dom/server'),
  {match, RouterContext} = require('react-router')

const routes = require('./src/routes')

app.get('/', (req,res) => {
  console.log(req.url)
  match({routes,location:req.url}, (err, redirect, renderProps) => {
    console.log(err, renderProps, redirect)
    const element = React.createElement(RouterContext, renderProps)
    const template = `<html><body><div id='root'>${ReactDOMServer.renderToString(element)}</div><script src="http://localhost:3000/static/bundle.js"></script></body></html>`.replace(/\s+/g, ' ').trim();
    res.send(template)
  })
})

app.listen(3000)