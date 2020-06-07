
import { of, throwError } from 'rxjs'
import { ActionsObservable } from 'redux-observable'

const defaultInterceptors = {
  delete: {},
  get: {},
  patch: {},
  post: {},
  put: {},
}

class AjaxInterceptor {
  interceptors = {
    ...defaultInterceptors,
  }

  intercept = (protocol, url, response, code = 200) => {
    this.interceptors[protocol.toLocaleLowerCase()][url] = {
      status: code,
      response,
    }
  }

  respondTo = (protocol, url) => {
    const interceptor = this.interceptors[protocol.toLocaleLowerCase()][url] || {}
    if (!interceptor.status) {
      throw Error(`There is no "${protocol}" interceptor for "${url}" in ${Object.keys(this.interceptors[protocol.toLocaleLowerCase()])}`)
    }

    if (interceptor.status >= 400) {
      return throwError({
        message: 'Error message',
        xhr: {},
        request: {
          async: true,
          crossDomain: false,
          withCredentials: false,
          headers: {},
          method: 'POST',
          responseType: 'json',
          timeout: 0,
          url,
          body: null,
        },
        status: interceptor.status,
        responseType: 'json',
        response: {
          code: interceptor.status,
          message: 'Error message',
          ...interceptor.response,
        },
      })
    }

    return of({ ...interceptor })
  }

  reset = () => {
    this.interceptors = {
      ...defaultInterceptors,
    }
  }

  get = url => this.respondTo('get', url)

  post = url => this.respondTo('post', url)

  delete = url => this.respondTo('delete', url)

  put = url => this.respondTo('put', url)

  patch = url => this.respondTo('patch', url)
}

export const ajaxInterceptor = new AjaxInterceptor()

export const epicToPromise = (epicFunc, action, state = {}) => epicFunc(
  ActionsObservable.of(action),
  { getState: () => state },
).source.toPromise()
