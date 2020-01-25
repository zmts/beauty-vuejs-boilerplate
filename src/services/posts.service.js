import { BaseService } from './base.service'

export class PostsService extends BaseService {
  static get entity () {
    return 'posts'
  }
}
