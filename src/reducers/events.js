
import * as actions from 'actions'

export default (state = actions.getInitialState().events, action = {}) => {
  switch (action.type) {
    case actions.EVENTS_ADD: {
      return [
        ...state,
        action.payload,
      ]
    }
    default:
  }
  return state
}
