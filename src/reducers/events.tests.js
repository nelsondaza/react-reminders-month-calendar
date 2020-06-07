
import * as actions from 'actions'
import m from 'mocks'

import reducer from './events'

describe('reducer::events', () => {
  const expectState = (action, expectedState, state = undefined) => {
    const newState = reducer(state, action)
    expect(newState === state).toBe(false)
    expect(newState).toMatchObject(expectedState)
    return newState
  }

  it('return the initial state by default', () => {
    expect(reducer()).toEqual(actions.getInitialState().events)
  })

  describe('EVENTS_ADD', () => {
    it('adds an event to the events list', () => {
      expectState(
        actions.eventsAdd(m.event()),
        [m.event()],
      )
    })

    it('adds an event at the end of the events list', () => {
      expectState(
        actions.eventsAdd(m.event(2)),
        [m.event(), m.event(2)],
        [m.event()],
      )
    })

    it('replaces an event with the same id', () => {
      expectState(
        actions.eventsAdd(m.event(2, { name: 'the replace' })),
        [m.event(), m.event(2, { name: 'the replace' })],
        [m.event(), m.event(2)],
      )
    })
  })
})
