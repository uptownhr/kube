import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import { createMiddleware } from './middleware/clientMiddleware.js'
import { routerMiddleware } from 'react-router-redux'

export default function createStore(history, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history)
  const middleware = [reduxRouterMiddleware]
  const reducer = require('./modules/reducer')

  let store = _createStore(reducer, {}, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'))
    })
  }

  return store
}