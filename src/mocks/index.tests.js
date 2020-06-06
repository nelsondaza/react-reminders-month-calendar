
import exports from './index'

describe('mocks', () => {
  it('exports the right elements', () => {
    expectKeys(
      exports,
      [
        'city',
        'weather',
      ],
    )
  })

  it('creates a weather with default props', () => {
    expect(exports.weather()).toMatchObject({
      id: 20,
      name: 'Clouds',
      description: 'broken clouds',
      icon: '04d',
    })
  })

  it('creates a city with default props', () => {
    expect(exports.city()).toMatchObject({
      country: 'CO',
      id: 10,
      name: 'Bogotá',
    })
  })

  it('creates a city with custom id', () => {
    expect(exports.city(23)).toMatchObject({
      country: 'CO',
      id: 23,
      name: 'Bogotá',
    })
  })
})
