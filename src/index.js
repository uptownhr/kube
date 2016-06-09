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

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}

