
import * as exports from './index'

describe('actions', () => {
  it('exports INITIAL_STATE with the right keys', () => {
    expectKeys(
      exports.getInitialState(),
      [
        'events',
        'cities',
      ],
    )
  })
})
