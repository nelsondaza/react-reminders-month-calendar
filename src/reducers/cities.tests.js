
import * as actions from 'actions'

import reducer from './cities'

describe('reducer::cities', () => {
  const expectState = (action, expectedState, state = undefined) => {
    const newState = reducer(state, action)
    expect(newState === state).toBe(false)
    expect(newState).toMatchObject(expectedState)
    return newState
  }

  it('return the initial state by default', () => {
    expect(reducer()).toEqual(actions.getInitialState().cities)
  })

  describe('CITIES_FETCH', () => {
    it('sets the initial state for the key', () => {
      expectState(
        actions.citiesFetch('city'),
        {
          key: 'city',
          loading: true,
        },
      )
    })
  })

  describe('CITIES_FETCH_FULFILLED', () => {
    it('sets the server response for the key', () => {
      expectState(
        actions.citiesFetchFulfilled({ server: true }),
        {
          data: { server: true },
          loaded: true,
          loading: false,
        },
      )
    })
  })

  describe('CITIES_FETCH_ERROR', () => {
    it('sets the error response in the key', () => {
      expectState(
        actions.citiesFetchError({ server: true }),
        {
          data: null,
          error: { server: true },
          loaded: true,
          loading: false,
        },
      )
    })
  })

  describe('CITIES_FETCH_CANCELED', () => {
    it('removes all values from a key in the store', () => {
      expectState(
        actions.citiesFetchCanceled(),
        actions.getInitialState().cities,
      )
    })
  })
})
