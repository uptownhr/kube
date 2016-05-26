import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createStore from './redux/create';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import getRoutes from './routes';

const store = createStore(browserHistory, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
  <Router history={history}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}