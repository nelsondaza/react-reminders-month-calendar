
import m from 'mocks'

import Component from './index'

import styles from './index.scss'

describe('components::MonthCalendar::Day', () => {
  const tc = createTestComponent(
    Component,
    {
      day: '3',
      events: [
        m.event(1),
        m.event(2),
        m.event(3),
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

  it('rendes a Chip for each event', () => {
    expectChange({
      fn: () => tc.setProps({ events: [m.event()] }),
      of: () => tc.scope.find('Chip').length,
      from: 3,
      to: 1,
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
})
