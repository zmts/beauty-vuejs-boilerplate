import BaseService from './base.service'

class PostsService extends BaseService {
  get entity () {
    return 'posts'
  }
}

export default new PostsService()
