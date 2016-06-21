import React from 'react'
import { Router, RouterContext, browserHistory } from 'react-router'
import {render} from 'react-dom'
import routes from './components/routes'

const selector = document.querySelector('#root')
const state = window.__INITIAL_STATE

const renderState = function(props){
  props.location.state = state
  return <RouterContext {...props} />
}

render( (
  <Router history={browserHistory} render={renderState}>
    {routes}
  </Router>
), selector)