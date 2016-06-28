import React from 'react'

import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Home from './containers/Home'
import About from './containers/About'

export default (<Route path="/" component={App}>
  //match everything for /
  <IndexRoute component={Home}></IndexRoute>
  <Route path="about" component={About}></Route>
</Route>)