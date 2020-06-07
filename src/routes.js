
import React, { Suspense, lazy } from 'react'

import { Route, Switch } from 'react-router-dom'

import ProgressBar from 'components/ProgressBar'
import Site from 'screens/Site'

const HomePage = lazy(() => import(/* webpackChunkName: 'home' */ 'screens/Home'))
const EventPage = lazy(() => import(/* webpackChunkName: 'event' */ 'screens/Event'))
const NotFoundPage = lazy(() => import(/* webpackChunkName: 'not_found' */ 'screens/NotFound'))

export default () => (
  <Site>
    <Suspense fallback={<ProgressBar ariaLabel="Cargando..." value={100} />}>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/event/:id/:day?" component={EventPage} exact />

        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  </Site>
)
