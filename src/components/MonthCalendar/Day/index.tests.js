
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

  it('onEditEvent is called when click on a Chip', () => {
    expectChange({
      fn: () => tc.scope.find('Chip').at(0).simulate('click', m.event()),
      of: () => tc.getProp('onEditEvent').mock.calls.length,
      by: 1,
    })
  })

  it('onRemoveEvent is called for each event', () => {
    expectChange({
      fn: () => tc.scope.find('SimpleButton').filter({ className: styles.remove }).simulate('click'),
      of: () => tc.getProp('onRemoveEvent').mock.calls.length,
      by: 2,
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

    it('can be expanded when more than maxVisibleEvents', () => {
      tc.setProps({
        events: [m.event(1), m.event(2), m.event(3), m.event(4)],
        maxVisibleEvents: 1,
      })

      expectBecameTrue({
        fn: () => tc.scope.find('SimpleButton').filter({ value: '+ 3 more' }).simulate('click'),
        of: () => tc.scope.find(`.${styles.list}`).exists(),
      })
    })

    it('can be collapsed clicking on cover zone', () => {
      tc.setProps({
        events: [m.event(1), m.event(2), m.event(3), m.event(4)],
        maxVisibleEvents: 1,
      })
      tc.scope.find('SimpleButton').filter({ value: '+ 3 more' }).simulate('click')

      expectBecameFalse({
        fn: () => tc.scope.find(`.${styles.cover}`).simulate('click'),
        of: () => tc.scope.find(`.${styles.list}`).exists(),
      })
    })
  })

  describe('onAddEvent', () => {
    it('is called when click inside', () => {
      expectChange({
        fn: () => tc.scope.simulate('click', { target: { nodeName: 'DIV' } }),
        of: () => tc.getProp('onAddEvent').mock.calls.length,
        by: 1,
      })
    })

    it('is NOT called when readOnly', () => {
      expectNoChange({
        fn: () => {
          tc.setProps({ readOnly: true })
          tc.scope.simulate('click', { target: { nodeName: 'DIV' } })
        },
        of: () => tc.getProp('onAddEvent').mock.calls.length,
        from: 0,
      })
    })

    it('is NOT called when click on button', () => {
      expectNoChange({
        fn: () => tc.scope.simulate('click', { target: { nodeName: 'BUTTON' } }),
        of: () => tc.getProp('onAddEvent').mock.calls.length,
        from: 0,
      })
    })
  })
})
