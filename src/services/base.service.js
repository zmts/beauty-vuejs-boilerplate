import qs from 'qs'
import { Http } from './http.init'
import { ResponseWrapper, ErrorWrapper } from './util'

export class BaseService {
  static get entity () {
    throw new Error('"entity" getter not defined')
  }
  /**
   * ------------------------------
   * @HELPERS
   * ------------------------------
   */

  static request (status = { auth: false }) {
    return new Http(status)
  }

  static responseWrapper (...rest) {
    return new ResponseWrapper(...rest)
  }

  static errorWrapper (...rest) {
    return new ErrorWrapper(...rest)
  }

  static querystring (obj) {
    return qs.stringify(obj, {
      encode: false
    })
  }

  /**
   * ------------------------------
   * @API_CALLS_PUBLIC
   * ------------------------------
   */

  static getListPublic (parameters = {}) {
    const params = {
      ...parameters
    }
    return new Promise((resolve, reject) => {
      return this.request().get(`${this.entity}`, { params })
        .then(response => {
          const data = {
            content: response.data.data.results,
            total: response.data.data.total
          }
          resolve(this.responseWrapper(response, data))
        }).catch(error => {
          const message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  static getByIdPublic (id = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request().get(`${this.entity}/${id}`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => {
          const message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  /**
   * ------------------------------
   * @API_CALLS_PRIVATE
   * ------------------------------
   */

  static getById (id = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({ auth: true }).get(`${this.entity}/${id}`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => {
          const message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  static create (data = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({ auth: true }).post(`${this.entity}`, data)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => reject(this.errorWrapper(error)))
    })
  }

  static update (id = window.required(), data = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({ auth: true }).patch(`${this.entity}/${id}`, data)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => reject(this.errorWrapper(error)))
    })
  }

  static remove (id = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({ auth: true }).delete(`${this.entity}/${id}`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => reject(this.errorWrapper(error)))
    })
  }
}
