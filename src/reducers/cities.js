
import * as actions from 'actions'

export default (state = actions.getInitialState().cities, action = {}) => {
  switch (action.type) {
    case actions.CITIES_FETCH: {
      return {
        ...actions.getInitialState().cities,
        key: action.payload,
        loading: true,
      }
    }
    case actions.CITIES_FETCH_FULFILLED: {
      return {
        ...state,
        data: action.payload,
        loaded: true,
        loading: false,
      }
    }
    case actions.CITIES_FETCH_ERROR: {
      return {
        ...state,
        data: null,
        error: action.payload,
        loaded: true,
        loading: false,
      }
    }
    case actions.CITIES_FETCH_CANCELED: {
      return actions.getInitialState().cities
    }
    default:
  }
  return state
}
