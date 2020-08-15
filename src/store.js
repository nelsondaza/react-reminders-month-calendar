
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history'
import { createEpicMiddleware } from 'redux-observable'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import rootReducerCreator, { epics } from './reducers'

export const history = createBrowserHistory()
const epicMiddleWare = createEpicMiddleware()
const middlewares = [epicMiddleWare, routerMiddleware(history)]

/* istanbul ignore next */
if (module.hot) {
  // Adds the logger
  // eslint-disable-next-line global-require
  const { createLogger } = require('redux-logger')
  middlewares.push(createLogger({
    // collapse all
    collapsed: () => true,
  }))
}

const store = createStore(
  rootReducerCreator(history),
  {},
  /* istanbul ignore next */
  module.hot && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares),
)
epicMiddleWare.run(epics)

/* istanbul ignore next */
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    // Reducer replace
    // eslint-disable-next-line global-require
    const hotReducers = require('./reducers')
    epicMiddleWare.run(hotReducers.epics)
    store.replaceReducer(hotReducers.default(history))
  })
}

export default store
