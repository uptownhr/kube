import React from 'react';
import {IndexRoute, Route} from 'react-router';

import {
  Home,
  NotFound
} from './containers';

export default (
  <Route path="/" component={Home} />
);
