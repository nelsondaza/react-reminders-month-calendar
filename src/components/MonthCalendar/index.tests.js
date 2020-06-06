
import m from 'mocks'
import Component from './index'

describe('components::MonthCalendar', () => {
  const tc = createTestComponent(
    Component,
    {
      events: [
        m.event(1, { datetime: 1591468704052 + 10000 }),
        m.event(2, { datetime: 1591468704052 - 10000 }),
        m.event(3, { datetime: 1591468704052 + 15000 }),
        m.event(4, { datetime: 1591468704052 - 10000 }),
        m.event(5, { datetime: 1591468704052 + 10000 }),
        m.event(6, { datetime: 1591468704052 + 10000 }),
      ],
    },
  )

  it('renders', () => {
    expect(tc.scope.type()).toBe('div')
  })

  it('uses custom className', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ className: 'myClass' }),
      of: () => tc.scope.hasClass('myClass'),
    })
  })
})
