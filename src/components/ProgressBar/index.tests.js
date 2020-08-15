
import Component from './index'

import styles from './index.scss'

describe('ui::components::ProgressBar', () => {
  const tc = createTestComponent(
    Component,
    {
      className: '',
      value: 20,
    },
  )

  it('uses custom className', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ className: 'myClass' }),
      of: () => tc.scope.hasClass('myClass'),
    })
  })

  it('uses custom ariaLabel', () => {
    expectChange({
      fn: () => tc.setProps({ ariaLabel: 'new aria' }),
      of: () => tc.scope.props()['aria-label'],
      to: 'new aria',
    })
  })

  it('uses descendent color when inverted prop is set', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ inverted: true }),
      of: () => tc.scope.hasClass(styles.inverted),
    })
  })

  it('uses alert styles prop is set', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ alert: true }),
      of: () => tc.scope.hasClass(styles.alert),
    })
  })

  it('uses complete styles when value is 100', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ value: 100 }),
      of: () => tc.scope.hasClass(styles.complete),
    })
  })

  describe('progress', () => {
    it('uses value as aria-label', () => {
      expect(tc.scope.props()['aria-valuenow']).toBe(20)
    })

    it('has a bar to hide a percentage', () => {
      expect(tc.scope.find(`.${styles.bar}`).props().style.width).toBe('80%')
    })
  })

  describe('value', () => {
    it('can be zero', () => {
      expectChange({
        fn: () => tc.setProps({ value: 0 }),
        of: () => tc.scope.props()['aria-valuenow'],
        to: 0,
      })
    })

    it('uses zero when less than zero', () => {
      expectChange({
        fn: () => tc.setProps({ value: -10 }),
        of: () => tc.scope.props()['aria-valuenow'],
        to: 0,
      })
    })

    it('uses decimals', () => {
      expectChange({
        fn: () => tc.setProps({ value: 10.234 }),
        of: () => tc.scope.props()['aria-valuenow'],
        to: 10.234,
      })
    })

    it('uses 100 when more than 100', () => {
      expectChange({
        fn: () => tc.setProps({ value: 110 }),
        of: () => tc.scope.props()['aria-valuenow'],
        to: 100,
      })
    })
  })
})
