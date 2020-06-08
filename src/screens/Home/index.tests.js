
import Connected, { Pure as Component } from './index'
import styles from './index.scss'

describe('screens::Home', () => {
  const tc = createTestComponent(
    Component,
    {
      events: [],
      eventsAdd: jest.fn(),
      eventsRemove: jest.fn(),
      history: {
        location: {},
        push: jest.fn(),
        replace: jest.fn(),
      },
      match: { params: {} },
    },
  )

  it('renders', () => {
    expect(tc.scope.type()).toBe('div')
  })

  it('creates a bunch of random events', () => {
    expectChange({
      fn: () => tc.scope.find('SimpleButton').filter({ className: styles.rand }).simulate('click'),
      of: () => tc.getProp('eventsAdd').mock.calls.length,
      by: 20,
    })
  })

  it('with a far month shows a TODAY button', () => {
    expectBecameTrue({
      fn: () => tc.scope.setProps({ match: { params: { day: +(new Date('2010-01-01')) } } }),
      of: () => tc.scope.find('SimpleButton').filter({ secondary: true }).exists(),
    })
  })

  it('with a far month can navigate to today', () => {
    tc.scope.setProps({ match: { params: { day: +(new Date('2010-01-01')) } } })
    expectChange({
      fn: () => tc.scope.find('SimpleButton').filter({ secondary: true }).simulate('click'),
      of: () => tc.getProp('history').push.mock.calls.length,
      by: 1,
    })
  })

  it('navigates to a prev month', () => {
    expectChange({
      fn: () => tc.scope.find('SimpleButton').at(0).simulate('click'),
      of: () => tc.getProp('history').push.mock.calls.length,
      by: 1,
    })
  })

  it('navigates to a next month', () => {
    expectChange({
      fn: () => tc.scope.find('SimpleButton').at(1).simulate('click'),
      of: () => tc.getProp('history').push.mock.calls.length,
      by: 1,
    })
  })

  it('navigates to events page on edit', () => {
    expectChange({
      fn: () => tc.scope.find('MonthCalendar').simulate('editEvent', {}),
      of: () => tc.getProp('history').push.mock.calls.length,
      by: 1,
    })
  })

  it('navigates to events page on add', () => {
    expectChange({
      fn: () => tc.scope.find('MonthCalendar').simulate('addEvent', {}),
      of: () => tc.getProp('history').push.mock.calls.length,
      by: 1,
    })
  })

  it('calls eventsRemove on remove', () => {
    expectChange({
      fn: () => tc.scope.find('MonthCalendar').simulate('removeEvent', {}),
      of: () => tc.getProp('eventsRemove').mock.calls.length,
      by: 1,
    })
  })

  describe('with connected component', () => {
    const tcc = createTestComponentConnected(
      Connected,
      {
        history: {
          location: {},
          push: jest.fn(),
          replace: jest.fn(),
        },
        match: { params: {} },
      },
    )

    it('renders', () => {
      expect(tcc.scope.type()).toBe('div')
    })
  })
})
