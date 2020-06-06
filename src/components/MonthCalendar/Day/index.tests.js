
import m from 'mocks'

import Component from './index'

import styles from './index.scss'

describe('components::MonthCalendar::Day', () => {
  const tc = createTestComponent(
    Component,
    {
      day: '3',
      events: [
        m.event(1, { datetime: 1591468704052 - 10000 }),
        m.event(2, { datetime: 1591468704052 + 10000 }),
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

  it('uses highlight className when prop is set', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ highlight: true }),
      of: () => tc.scope.hasClass(styles.highlight),
    })
  })

  it('can change initial number', () => {
    expectChange({
      fn: () => tc.setProps({ day: '34' }),
      of: () => tc.scope.find(`.${styles.number}`).text(),
      from: '3',
      to: '34',
    })
  })

  it('number users active className when prop is set', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ active: true }),
      of: () => tc.scope.find(`.${styles.number}`).hasClass(styles.active),
    })
  })

  describe('readOnly', () => {
    it('uses readOnly className when set', () => {
      expectBecameTrue({
        fn: () => tc.setProps({ readOnly: true }),
        of: () => tc.scope.hasClass(styles.readOnly),
      })
    })
  })

  describe('events', () => {
    it('rendes a Chip for each', () => {
      expectChange({
        fn: () => tc.setProps({ events: [m.event()] }),
        of: () => tc.scope.find('Chip').length,
        from: 2,
        to: 1,
      })
    })

    it('rendes a limited list of Chip according to maxVisibleEvents', () => {
      expectChange({
        fn: () => tc.setProps({ maxVisibleEvents: 1 }),
        of: () => tc.scope.find('Chip').length,
        from: 2,
        to: 1,
      })
    })

    it('rendes a +N more button when mora than 3', () => {
      expectBecameTrue({
        fn: () => tc.setProps({
          events: [m.event(1), m.event(2), m.event(3), m.event(4)],
        }),
        of: () => tc.scope.find('SimpleButton').filter({ value: '+ 1 more' }).exists(),
      })
    })

    it('rendes a +N more button depending on maxVisibleEvents prop', () => {
      expectBecameTrue({
        fn: () => tc.setProps({
          events: [m.event(1), m.event(2), m.event(3), m.event(4)],
          maxVisibleEvents: 1,
        }),
        of: () => tc.scope.find('SimpleButton').filter({ value: '+ 3 more' }).exists(),
      })
    })
  })
})
