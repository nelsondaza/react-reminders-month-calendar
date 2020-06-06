
import * as exports from './index'

describe('echemas', () => {
  it('exports the right elements', () => {
    expectKeys(
      exports,
      [
        'ChildrenSchema',
        'CitySchema',
      ],
    )
  })
})
