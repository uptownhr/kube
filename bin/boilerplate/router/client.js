import React from 'react'
import { render } from 'react-dom'
import { Router, RouterContext, browserHistory } from 'react-router'

const selector = document.querySelector('#root')
const state = window.__INITIAL_STATE

const routes = require('./routes')


const renderState = function(props){
  props.location.state = state
  return <RouterContext {...props} />
}


render((
  <Router history={browserHistory} render={renderState}>
    {routes}
  </Router>
), selector)