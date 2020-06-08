
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
      onAddEvent: jest.fn(),
      onEditEvent: jest.fn(),
      onRemoveEvent: jest.fn(),
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

  it('calls onAddEvent with the right datetime', () => {
    expectChange({
      fn: () => tc.scope.find('Day').filter({ active: true }).at(0).simulate('addEvent'),
      of: () => tc.getProp('onAddEvent').mock.calls.length,
      by: 1,
    })
  })

  it('calls onRemoveEvent with the right datetime', () => {
    expectChange({
      fn: () => tc.scope.find('Day').filter({ active: true }).at(0).simulate('removeEvent'),
      of: () => tc.getProp('onRemoveEvent').mock.calls.length,
      by: 1,
    })
  })
})
