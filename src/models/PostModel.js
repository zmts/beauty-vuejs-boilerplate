import BaseModel from './BaseModel'

export default class PostModel extends BaseModel {
  get schema () {
    return {
      id: undefined,
      userId: undefined,
      blogId: undefined,
      content: undefined,

      private: undefined,
      isDraft: undefined,

      createdAt: undefined,
      updatedAt: undefined
    }
  }

  prepareCreate () {
    this.baseClear()

    return this
  }

  prepareUpdate () {
    this.baseClear()

    return this
  }
}
