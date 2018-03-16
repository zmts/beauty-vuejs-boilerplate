import BaseService from './base.service'

export default class PostsService extends BaseService {
  static get entity () {
    return 'posts'
  }

  static getPosts (parameters = {}) {
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
        })
        .catch(error => {
          let message = error.response.data ? error.response.data.error : error.response.statusText
          reject(this.errorWrapper(error, message))
        })
    })
  }
}
