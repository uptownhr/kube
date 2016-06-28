const React = require('react'),
  { renderToString } = require('react-dom/server'),
  { match, RouterContext } = require('react-router'),
  { createStore } = require('redux'),
  { Provider } = require('react-redux')

module.exports = function(Component, url, state){
  const componentString = RouterReduxComponent(Component, url, state)
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
  return renderToString(element)
}

/**
 * if your server.js exports routes from react-router
 * @param Component
 * @constructor
 */
function RouterComponent(Routes, url, state){
  let string = ''

  match({ routes: Routes, location: url }, (err, redirect, renderProps) => {
    renderProps.location.state = state

    const routerElement = React.createElement(RouterContext, renderProps)
    string = renderToString(routerElement)
  })

  return string
}


/**
 * if your server.js exports routes from react-router
 * with redux
 * @param Component
 * @constructor
 */
function RouterReduxComponent(Server, url, state){
  let string = ''

  match({ routes: Server.routes, location: url }, (err, redirect, renderProps) => {
    let store = createStore(Server.rootReducer, state)

    const routerElement = React.createElement(RouterContext, renderProps)
    const providerElement = React.createElement(Provider,{store}, routerElement)

    string = renderToString(providerElement)
  })

  return string
}