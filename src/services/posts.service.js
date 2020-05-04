import { assert } from '@/core'
import { BaseService } from './base.service'
import { ErrorWrapper, ResponseWrapper } from './util'

export class PostsService extends BaseService {
  static get entity () {
    return 'posts'
  }

  static async getPostsByUserId (params = {}) {
    assert.object(params, { required: true })
    assert.object(params.filter, { required: true })
    assert.id(params.filter.userId, { required: true })

    try {
      const response = await this.request({ auth: true }).get(`${this.entity}?${this.querystring(params)}`)
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
}
