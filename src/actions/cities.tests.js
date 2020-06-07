
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
    ajaxIntercept(
      'GET',
      'https://api.openweathermap.org/data/2.5/find?q=city&type=like&cnt=30&appid=4261fc9ccbfd90c8600afd9bc9cfc6bf',
      { list: [] },
    )
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
    ajaxIntercept(
      'GET',
      'https://api.openweathermap.org/data/2.5/find?q=city&type=like&cnt=30&appid=4261fc9ccbfd90c8600afd9bc9cfc6bf',
      { message: 'error msg' },
      400,
    )
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
