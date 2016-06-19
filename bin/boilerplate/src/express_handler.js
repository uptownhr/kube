const React = require('react'),
  ReactDOMServer = require('react-dom/server'),
  { match, RouterContext } = require('react-router')

module.exports = function(Component, url, state){
  const componentString = SingleComponent(Component, state)
  return componentString
}

/**
 * if your server.js exports a single component
 * @param Component
 * @returns String
 * @constructor
 */
function SingleComponent(Component, state){
  const element = React.createElement(Component, state)
  return ReactDOMServer.renderToString(element)
}

/**
 * if your server.js exports routes from react-router
 * @param Component
 * @constructor
 */
function RouterComponent(Routes, url, state){
  let string = ''

  match({Routes,location:req.url}, (err, redirect, renderProps) => {
    renderProps.location.state = state

    const routerElement = React.createElement(RouterContext, renderProps)
    string = ReactDOMServer.renderToString(routerElement)
  })

  return string
}