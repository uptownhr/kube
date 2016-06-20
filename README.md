![Kube](https://cdn.rawgit.com/uptownhr/kube/master/src/containers/Home/cube.svg)

# Kube
Universal React Express middleware package. A universal react dev environment provided through `npm install`


## What's included?
Kube comes with with a middleware that will,

1. render your components serverside
2. webpack dev server
3. webpack hot module reloader server
4. webpack module loaders from the server

## Webpack module loaders for the server
Webpack module loaders are awesome and brings lot of value to your react development. You can now compose a package with all it's depedencies together. However, problems rise when you attempt to use module loaders for server side rendering purposes. Normal implementations of SSR uses the React-DOMServer to render a component to string. When the DOMServer attempts to require in a file(like an image) normally handled by a webpack loader, it will error out. Node's require expects all loaded files to be a JSON. 
 
 Using Kube, components rendered from the server are also prebuilt using webpack. Meaning all the module loaders have parsed through the require statements already. This results in a clean translation between client/server, allowing you to easily use module loaders on react universally. 


## Use as a standalone server
`npm install -g kube`

New Project

1. `kube init testing-kube`
2. `cd testing-kube`
3. `kube up`

Existing Project

1. `cd your-project`
2. `kube init`
3. `kube up`

Visit localhost:3000

## Use as a Middleware
`npm install --save-dev kube`

### Express App - Server side rendering
```js
// /index.js
const express = require('express');
const app = express()

/*
Loads middleware and provides
1. the webpack dev server
2. the webpack hot moldule reloader
3. res.kube.render
*/
require('kube')(app, {
  src_path: "src",
  public_path: "public",
  debug: false
})

app.get('/', function(req,res){
  let state = { ssr: 'server state' }
  res.kube.render(state)
})
```


## kube CLI
Kube CLI, installed through `npm install -g kube` provides an easy way to get Kube setup on an existing project or a new project. 

### Commands
#### init
Calling `kube init` will generate the default .kuberc and directories for you. It also includes a sample React Component to demonstrate a simple use case.

Files/directories generated
- [/src/client.js](https://github.com/uptownhr/kube/blob/master/bin/boilerplate/src/client.js) 
- [/src/server.js](https://github.com/uptownhr/kube/blob/master/bin/boilerplate/src/server.js)
- [/src/layout.js](https://github.com/uptownhr/kube/blob/master/bin/boilerplate/src/layout.js)
- [/src/express_handler.js](https://github.com/uptownhr/kube/blob/master/bin/boilerplate/src/express_handler.js)
- /public
- [/.kuberc](https://github.com/uptownhr/kube/blob/master/bin/boilerplate/.kuberc)

#### up
Calling 'kube up' will start the server and you can browse by visiting http://localhost:3000

Currently unfinshed are the -p and -d option flags to change the listening port and to run in the background.

## Files
There are 5 files that are mandatory to use kube. These are automatically generated for you if you've used `kube init`. 

### client.js
This is the entry point for your client-side javascript. Normally this will initialize and mount your app to the dom.

sample
```js
import React from 'react'
import {render} from 'react-dom'
import App from './components/App'

const selector = document.querySelector('#root')
const state = window.__INITIAL_STATE
render(<App {...state} />, selector)
```

### server.js
The component to make available to the server for rendering. The server.js must export an object to be used by the server. This could be an simple single Component or a React Routes component.

sample
```js
module.exports = require('./components/App')
```


### layout.js
A file to make updates to the main layout file being rendered from the server. This file should export a function that the server will call to generate the html string. The server passes,
- renderString: This is the rendered component
- bundlePath: This is where the bundle.js exists for the browser to consume
- stylePath: This is where the styles.css exists for the browser to consume
- stateString: This is an optional state object converted to string through `JSON.stringify` that can be passed to the browser.

sample
```js
module.exports = function ({renderString, bundlePath, stylePath, stateString }) {
  return `
   <html>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
   <link rel="stylesheet" href="${stylePath}">
   <body>
   <div id='root'>${renderString}</div>
   <script>
   window.__INITIAL_STATE = ${stateString}
   </script>
   <script src="${bundlePath}"></script>
   </body>
   </html>
  `
}
```

### express_handler.js
The express handler defines how your component will be rendered to string, and is used by `res.kube.render`. The express_handler exports a function and receives these 3 parameters,
- Component: Component is the exported module from `server.js`
- url: the current url path the browser hit, directly from `req.url`
- state: the state passed from `res.kube.render`

sample
```js
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
```


### .kuberc
Configuration of the paths and toggling debug mode.

Only mandatory if using the standalone server through `kube up`. The middleware implementation takes in options during initialization.

default
```js
module.exports = {
  src_path: "src",
  public_path: "public",
  debug: false
}
```

#### src_path
Tells kube where the main files are located.

#### public_path
Tells kube where to place bundles and static assets for serving to the browser.
 
#### debug
Turns on additional debug information from kube.


## Todo
- [ ] production mode
- [ ] improve cli options
- [ ] ability to configure webpack
