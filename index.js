require('babel-register')
const {uncache}= require('./util')
const express = require('express'),
  app = express(),
  { server, hot } = require('./server')

app.use( server, hot )

const React = require('react'),
  ReactDOMServer = require('react-dom/server'),
  {match, RouterContext} = require('react-router')



app.get('/', (req,res) => {
  let id = require.resolve('./src/routes')
  if(id) uncache('./src/routes')
  console.log( require.cache[id] )

  const routes = require('./src/routes')


  match({routes,location:req.url}, (err, redirect, renderProps) => {
    const element = React.createElement(RouterContext, renderProps)
    const template = `<html><body><div id='root'>${ReactDOMServer.renderToString(element)}</div><script src="http://localhost:3000/static/bundle.js"></script></body></html>`.replace(/\s+/g, ' ').trim();
    res.send(template)
  })
})

app.listen(3000)