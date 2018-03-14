import { BaseService } from './base.service'

export class PostsService extends BaseService {
  static get entity () {
    return 'posts'
  }

  static getPosts () {
    return new Promise((resolve, reject) => {
      return this.request().get(`${this.entity}`)
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
