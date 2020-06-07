
import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

export default appHistory => combineReducers({
  router: connectRouter(appHistory),
})

export const epics = combineEpics()
