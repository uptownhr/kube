const React = require('react'),
  ReactDOMServer = require('react-dom/server'),
  { match, RouterContext } = require('react-router')

module.exports = function(Component, url, state){
  const componentString = RouterComponent(Component, url, state)
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

  match({routes: Routes, location: url}, (err, redirect, renderProps) => {
    renderProps.location.state = state
    console.log('wtetstst')
    const routerElement = React.createElement(RouterContext, renderProps)
    string = ReactDOMServer.renderToString(routerElement)
  })

  return string
}