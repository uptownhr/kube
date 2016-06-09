# Hackable Reax
Universal React Express middleware package. A universal react dev environment provided through `npm install`


## What's included?
Reax comes with with a middleware that will,

1. render your components `react-router/routes` component serverside
2. webpack dev server
3. webpack hot module reloader server
4. webpack module loaders from the server

## Webpack module loaders for the server
Webpack module loaders are awesome and brings lot of value to your react development. You can now compose a package with all it's depedencies together. However, problems rise when you attempt to use module loaders for server side rendering purposes. Normal implementations of SSR uses the React-DOMServer to render a component to string. When the DOMServer attempts to require in a file(like an image) normally handled by a webpack loader, it will error out. Node's require expects all loaded files to be a JSON. 
 
 Using Reax, components rendered from the server are also prebuilt using webpack. Meaning all the module loaders have parsed through the require statements already. This results in a clean translation between client/server, allowing you to easily use module loaders on react universally. 


## hackable-reax boilderplate

The repo currently contains a boilerplate demo. To try,

1. git clone git@github.com/uptownhr/hackable-reax
2. npm install
3. npm run dev

## hackable-reax on your project

### Install
`npm install --save-dev hackable-reax`


### Express App - Server side rendering
```js
// /index.js
const express = require('express');
const app = express()

/*
Loads middleware and provides
1. the webpack dev server
2. the webpack hot moldule reloader
3. res.reax.render
*/
require('hackable-reax')(app)

app.get('/', function(req,res){
  let state = { ssr: 'server state' }
  res.reax.render(state)
})

```

### React Routes
```js
// /src/routes.js
import React from 'react';
import {IndexRoute, Route} from 'react-router';

const Home = function(props){
  return <div>{JSON.stringify(props.location.state)}</div>
}

export default (
  <Route path="/" component={Home} />
);

```

### Browser App - Client resuming react components
```js
// /src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { RouterContext, Router, browserHistory } from 'react-router';

import routes from './routes';


const render = function(props){
  props.location.state = window.state
  return <RouterContext {...props} />
}

ReactDOM.render(
  <Router history={browserHistory} render={render}>
    {routes}
  </Router>,
  document.getElementById('root')
);
```

## Still in Alpha
Currently, Reax is still in heavy development and being ironed out. There are many places for improvement to add flexibility and configuration. In the current stage there are some strong dependencies the app requires. Until configuration api end points are created, please keep the following in mind.

Some form of the 3 files mentioned above need to exist. 
1. `/index/js`: is flexible but needs to load in the hackable-reax middleware
2. `/src/routes.js`: `res.reax.render` depends on `react-router/routes` to automatically create your components per a given url. This file must currently exist at `/src/routes.js`
3. `/src/index.js`: this is the entry point for your browser side code. Again, this file must exist and implement `ReactRouter` to render the `routes` to the dom. Also must exist at `/src/index.js`