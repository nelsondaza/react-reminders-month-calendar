
import Component from './index'

import styles from './index.scss'

describe('components::Chip', () => {
  const tc = createTestComponent(
    Component,
    {
      ariaLabel: 'my initial label',
      children: 'Chip content',
      className: '',
    },
  )

  it('uses custom className', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ className: 'myClass' }),
      of: () => tc.scope.hasClass('myClass'),
    })
  })

  it('uses ariaLabel when set', () => {
    expectChange({
      fn: () => tc.setProps({ ariaLabel: 'my label for aria' }),
      of: () => tc.scope.find('button').props()['aria-label'],
      to: 'my label for aria',
    })
  })

  it('uses value when set', () => {
    expectChange({
      fn: () => tc.setProps({ value: 'my value' }),
      of: () => tc.scope.find('button').props().value,
      to: 'my value',
    })
  })

  it('renders children as content', () => {
    expectChange({
      fn: () => tc.setProps({ children: 'the new content' }),
      of: () => tc.scope.text(),
      to: 'the new content',
    })
  })

  it('calls onClick when set', () => {
    const onClick = jest.fn()
    tc.setProps({ onClick })
    expectChange({
      fn: () => tc.scope.find('button').simulate('click'),
      of: () => onClick.mock.calls.length,
      by: 1,
    })
  })
})
