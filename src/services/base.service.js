import Http from './http.init'
import { ResponseWrapper, ErrorWrapper } from './util'

export default class BaseService {
  constructor () {
    if (!this.entity) {
      throw new Error('Child service class not provide entity')
    }
  }

  /**
   * ------------------------------
   * @HELPERS
   * ------------------------------
   */

  request (status = {auth: false}) {
    return new Http(status)
  }

  responseWrapper (...rest) {
    return new ResponseWrapper(...rest)
  }

  errorWrapper (...rest) {
    return new ErrorWrapper(...rest)
  }

  /**
   * ------------------------------
   * @API_CALLS_PUBLIC
   * ------------------------------
   */

  getListPublic (parameters = {}) {
    const params = {
      ...parameters
    }
    return new Promise((resolve, reject) => {
      return this.request().get(`${this.entity}`, { params })
        .then(response => {
          let data = {
            content: response.data.data.results,
            total: response.data.data.total
          }
          resolve(this.responseWrapper(response, data))
        }).catch(error => {
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  getByIdPublic (id = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request().get(`${this.entity}/${id}`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => {
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  /**
   * ------------------------------
   * @API_CALLS_PRIVATE
   * ------------------------------
   */

  getById (id = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({auth: true}).get(`${this.entity}/${id}`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => {
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  create (data = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({auth: true}).post(`${this.entity}`, data)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => reject(this.errorWrapper(error)))
    })
  }

  update (id = window.required(), data = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({auth: true}).patch(`${this.entity}/${id}`, data)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => reject(this.errorWrapper(error)))
    })
  }

  remove (id = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({auth: true}).delete(`${this.entity}/${id}`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => reject(this.errorWrapper(error)))
    })
  }
}
