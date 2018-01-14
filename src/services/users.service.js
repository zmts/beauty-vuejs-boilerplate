import { BaseService } from './base.service'

export class UsersService extends BaseService {
  static get entity () {
    return 'users'
  }

  static getById (user_id) {
    return new Promise((resolve, reject) => {
      return this.request({auth: true}).get(`${this.entity}/${user_id}`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => {
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  static getCurrent () {
    return new Promise((resolve, reject) => {
      return this.request({auth: true}).get(`${this.entity}/current`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => {
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  static getPostsByUserId (user_id) {
    return new Promise((resolve, reject) => {
      return this.request({auth: true}).get(`${this.entity}/${user_id}/posts`)
        .then(response => {
          let data = {
            content: response.data.data,
            total: response.data.data.total ? response.data.data.total : ''
          }
          resolve(this.responseWrapper(response, data))
        })
        .catch(error => {
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }
}
