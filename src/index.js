
import React from 'react'

import Provider from 'react-redux/es/components/Provider'
import { ConnectedRouter } from 'connected-react-router'

import { render } from 'react-dom'

import Routes from './routes'
import store, { history } from './store'

const renderApp = () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
  )
}

if (module.hot) {
  // Enable Webpack hot module replacement
  module.hot.accept(renderApp)
}

renderApp()
