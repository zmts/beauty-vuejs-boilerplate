import BaseService from './base.service'

class UsersService extends BaseService {
  get entity () {
    return 'users'
  }

  getCurrent () {
    return new Promise((resolve, reject) => {
      return this.request({auth: true}).get(`${this.entity}/current`)
        .then(response => resolve(this.responseWrapper(response, response.data.data)))
        .catch(error => {
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }

  getPostsByUserId (user_id = window.required()) {
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

export default new UsersService()
