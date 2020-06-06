
import { Link } from 'react-router-dom'

import Component from './index'

describe('components::Link', () => {
  const tc = createTestComponent(
    Component,
    {
      children: 'link content',
      className: '',
      href: 'http://test.com',
    },
  )

  it('renders', () => {
    expect(tc.scope.type()).toBe(Link)
  })

  it('uses custom className', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ className: 'myClass' }),
      of: () => tc.scope.hasClass('myClass'),
    })
  })

  it('external link will add icon', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ target: '_blank' }),
      of: () => tc.scope.find('Icon').exists(),
    })
  })

  it('can render a custom tag', () => {
    expectBecameTrue({
      fn: () => tc.setProps({ as: 'a' }),
      of: () => tc.scope.find('a').exists(),
    })
  })
})
