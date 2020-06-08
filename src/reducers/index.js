
import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import * as actions from 'actions'

import cities from './cities'
import events from './events'

export default appHistory => combineReducers({
  router: connectRouter(appHistory),

  cities,
  events,
})

export const epics = combineEpics(
  actions.citiesFetchEpic,
)
