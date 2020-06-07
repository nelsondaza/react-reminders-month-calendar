
import { ajax } from 'rxjs/ajax'
import { catchError, debounceTime, filter, map, mergeMap, takeUntil } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType } from 'redux-observable'

export const CITIES_FETCH = 'CITIES_FETCH'
export const CITIES_FETCH_CANCELED = 'CITIES_FETCH_CANCELED'
export const CITIES_FETCH_ERROR = 'CITIES_FETCH_ERROR'
export const CITIES_FETCH_FULFILLED = 'CITIES_FETCH_FULFILLED'

export const citiesFetch = payload => ({
  payload,
  type: CITIES_FETCH,
})

export const citiesFetchFulfilled = payload => ({
  payload,
  type: CITIES_FETCH_FULFILLED,
})

export const citiesFetchCanceled = () => ({
  payload: null,
  type: CITIES_FETCH_CANCELED,
})

export const citiesFetchError = payload => ({
  payload,
  type: CITIES_FETCH_ERROR,
})

export const citiesFetchEpic = action$ => action$.pipe(
  ofType(CITIES_FETCH),
  filter(action => action.payload.length >= 3),
  debounceTime(700),
  mergeMap(action => ajax.get(
    `https://api.openweathermap.org/data/2.5/find?q=${action.payload}&type=like&cnt=30&appid=4261fc9ccbfd90c8600afd9bc9cfc6bf`,
  ).pipe(
    map(({ response }) => citiesFetchFulfilled(response)),
    catchError(({ response }) => of(citiesFetchError({ error: response }))),
  )),
  takeUntil(action$.pipe(ofType(CITIES_FETCH_CANCELED))),
)
