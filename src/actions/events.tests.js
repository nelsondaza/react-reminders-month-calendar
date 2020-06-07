
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
})
