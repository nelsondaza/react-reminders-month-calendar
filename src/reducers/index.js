
import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import events from './events'

export default appHistory => combineReducers({
  router: connectRouter(appHistory),

  events,
})

export const epics = combineEpics()
