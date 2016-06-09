## Install
`npm install --save-dev hackable-reax`

## React Routes
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

## Browser App - Client resuming react components
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


## Express App - Server side rendering
```js
// /index.js
const express = require('express');
const app = express()

require('hackable-reax')(app)
app.get('/', function(req,res){
  let state = { ssr: 'server state' }
  res.reax.render(state)
})

```