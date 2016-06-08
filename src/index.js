import React from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';

import routes from './routes';

ReactDOM.render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}