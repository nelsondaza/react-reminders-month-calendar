
import * as actions from 'actions'

export default (state = actions.getInitialState().events, action = {}) => {
  switch (action.type) {
    case actions.EVENTS_ADD: {
      return [
        ...state.filter(event => event.id !== action.payload.id),
        action.payload,
      ]
    }
    case actions.EVENTS_REMOVE: {
      return [
        ...state.filter(event => event.id !== action.payload),
      ]
    }
    default:
  }
  return state
}
