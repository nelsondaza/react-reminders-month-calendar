
import React from 'react'

import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

const renderApp = () => {
  render(
    <BrowserRouter>
      <h1>cd react-reminders-month-calendar</h1>
    </BrowserRouter>,
    document.getElementById('app'),
  )
}

if (module.hot) {
  // Enable Webpack hot module replacement
  module.hot.accept(renderApp)
}

renderApp()
