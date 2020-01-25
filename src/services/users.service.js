import { BaseService } from './base.service'

export class UsersService extends BaseService {
  static get entity () {
    return 'users'
  }

  static getCurrent () {
    return new Promise((resolve, reject) => {
      return this.request({ auth: true }).get(`${this.entity}/current`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => {
          const message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  static getPostsByUserId (user_id = window.required()) {
    return new Promise((resolve, reject) => {
      return this.request({ auth: true }).get(`${this.entity}/${user_id}/posts`)
        .then(response => {
          const data = {
            content: response.data.data,
            total: response.data.data.total ? response.data.data.total : ''
          }
          resolve(this.responseWrapper(response, data))
        })
        .catch(error => {
          const message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }
}
