
import * as exports from './index'

describe('schemas', () => {
  it('exports the right elements', () => {
    expectKeys(
      exports,
      [
        'ChildrenSchema',
        'CitySchema',
        'EventSchema',
        'RouterHistorySchema',
        'RouterMatchSchema',
        'WeatherSchema',
      ],
    )
  })
})
