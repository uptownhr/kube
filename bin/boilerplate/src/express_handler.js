const React = require('react'),
  ReactDOMServer = require('react-dom/server'),
  { match, RouterContext } = require('react-router'),
  render = require('preact-render-to-string'),
  { h } = require('preact')

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
  const element = h(Component, state)
  return render(element)
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

    const routerElement = h(RouterContext, renderProps)
    string = render(routerElement)
  })

  return string
}