
import m from 'mocks'

import * as actions from './events'

describe('actions::events', () => {
  it('eventsAdd returns correct action', () => {
    expect(actions.eventsAdd(m.event()))
      .toEqual({
        payload: m.event(),
        type: 'EVENTS_ADD',
      })
  })

  it('eventsRemove returns correct action', () => {
    expect(actions.eventsRemove(1))
      .toEqual({
        payload: 1,
        type: 'EVENTS_REMOVE',
      })
  })
})
