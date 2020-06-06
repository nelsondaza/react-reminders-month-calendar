
import Component from './index'

describe('components::MonthCalendar', () => {
  const tc = createTestComponent(
    Component,
    {},
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
