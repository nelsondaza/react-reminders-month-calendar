
import Component from './index'

describe('screens::Site', () => {
  const tc = createTestComponent(
    Component,
    {
      children: 'Site content',
    },
  )

  it('renders', () => {
    expect(tc.scope.type()).toBe('main')
  })

  it('scrolls up when route changes', () => {
    window.scrollTo = jest.fn()
    expectChange({
      fn: () => tc.scope.setProps({ location: { pathname: '/new' } }),
      of: () => window.scrollTo.mock.calls.length,
      by: 1,
    })
  })

  it('do not scrolls up when route is the same', () => {
    window.scrollTo = jest.fn()
    expectNoChange({
      fn: () => tc.scope.setProps({ location: { pathname: '' } }),
      of: () => window.scrollTo.mock.calls.length,
      from: 0,
    })
  })
})
