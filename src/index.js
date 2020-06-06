
import React from 'react'

import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes'

const renderApp = () => {
  render(
    <BrowserRouter>
      <Routes />
    </BrowserRouter>,
    document.getElementById('app'),
  )
}

if (module.hot) {
  // Enable Webpack hot module replacement
  module.hot.accept(renderApp)
}

renderApp()
