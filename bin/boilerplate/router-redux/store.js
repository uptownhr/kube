import { createStore, compose } from 'redux'
import { browserHistory } from 'react-router'
import rootReducer from './reducers/index'

//starting state
const defaultState = window.__INITIAL_STATE

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, defaultState, enhancers)

//hot reloading to re-require reducers
if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store