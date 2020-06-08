
import Component from './index'

describe('screens::NotFound', () => {
  const tc = createTestComponent(
    Component,
    {
    },
  )

  it('renders', () => {
    expect(tc.scope.type()).toBe('div')
  })
})
