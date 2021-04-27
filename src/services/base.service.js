import qs from 'qs'
import { assert } from '@/core'

import { Http } from './http.init'
import { ResponseWrapper, ErrorWrapper } from './util'

export class BaseService {
  static get entity () {
    throw new Error('entity getter not defined')
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

  static async getListPublic (parameters = {}) {
    assert.object(parameters)

    const params = { ...parameters }

    try {
      const response = await this.request().get(`${this.entity}`, { params })
      const data = {
        content: response.data.data,
        total: Number(response.headers['x-total-count'])
      }

      return new ResponseWrapper(response, data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }

  static async getByIdPublic (id) {
    assert.id(id, { required: true })

    try {
      const response = await this.request().get(`${this.entity}/${id}`)
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }

  /**
   * ------------------------------
   * @API_CALLS_PRIVATE
   * ------------------------------
   */

  static async getById (id) {
    assert.id(id, { required: true })

    try {
      const response = await this.request({ auth: true }).get(`${this.entity}/${id}`)
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }

  static async create (data = {}) {
    assert.object(data, { required: true })

    try {
      const response = await this.request({ auth: true }).post(`${this.entity}`, data)
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async update (id, data = {}) {
    assert.id(id, { required: true })
    assert.object(data, { required: true })

    try {
      const response = await this.request({ auth: true }).patch(`${this.entity}/${id}`, data)
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async remove (id) {
    assert.id(id, { required: true })

    try {
      const response = await this.request({ auth: true }).delete(`${this.entity}/${id}`)
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }
}
