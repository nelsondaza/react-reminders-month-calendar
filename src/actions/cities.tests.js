
import { getAPI } from 'constants'

import * as actions from './cities'

describe('actions::cities', () => {
  it('citiesFetchCanceled returns correct action', () => {
    expect(actions.citiesFetchCanceled())
      .toEqual({
        payload: null,
        type: 'CITIES_FETCH_CANCELED',
      })
  })

  it('citiesFetch returns correct action', () => {
    expect(actions.citiesFetch('search'))
      .toEqual({
        payload: 'search',
        type: 'CITIES_FETCH',
      })
  })

  it('citiesFetchEpic returns correct response', () => {
    ajaxIntercept('GET', getAPI({ q: 'city' }), { list: [] })
    return epicToPromise(
      actions.citiesFetchEpic,
      actions.citiesFetch('city'),
    ).then((actions$) => {
      expect(actions$).toMatchObject(actions.citiesFetchFulfilled({
        list: [],
      }))
    })
  })

  it('citiesFetchEpic throws error', () => {
    ajaxIntercept('GET', getAPI({ q: 'city' }), { message: 'error msg' }, 400)
    return epicToPromise(
      actions.citiesFetchEpic,
      actions.citiesFetch('city'),
    ).then((actions$) => {
      expect(actions$).toMatchObject(actions.citiesFetchError({
        error: {
          code: 400,
          message: 'error msg',
        },
      }))
    })
  })
})
