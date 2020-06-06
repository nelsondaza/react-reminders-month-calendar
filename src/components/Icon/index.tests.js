
import Component from './index'

describe('components::Icon', () => {
  const tc = createTestComponent(
    Component,
    {
      className: '',
      name: 'external',
    },
  )

  it('renders', () => {
    expect(tc.scope.find('svg').exists()).toBe(true)
  })

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

  it('ariaLabel is used as title', () => {
    expectChange({
      fn: () => tc.setProps({ ariaLabel: 'new aria' }),
      of: () => tc.scope.find('title').text(),
      from: 'External Link',
      to: 'new aria',
    })
  })
})
