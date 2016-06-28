import React from 'react'
import { render } from 'react-dom'

//import react-router deps
import { Router, browserHistory } from 'react-router'
import routes from './routes'

//load redux deps
import { Provider } from 'react-redux'
import store from './store'

const router = (
  //change url without reloading page
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
)

render(router, document.querySelector('#root'))
