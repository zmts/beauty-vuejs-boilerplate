export default class BaseModel {
  constructor (src = {}) {
    this.buildModel(src, this.schema)
  }

  get schema () {
    throw new Error('Model schema not defined.')
  }

  buildModel (src = {}, schema = {}) {
    Object.keys(schema).forEach(schemaProp => {
      const srcPropType = typeof src[schemaProp]
      if (['number', 'boolean', 'string', 'object'].includes(srcPropType) && ![undefined, null].includes(src[schemaProp])) {
        this[schemaProp] = src[schemaProp]
      } else {
        this[schemaProp] = schema[schemaProp]
      }
    })
  }

  baseClear () {
    delete this.id
    delete this.userId
    delete this.createdAt
    delete this.updatedAt

    Object.keys(this).forEach(key => {
      if (Array.isArray(this[key]) && !this[key].length) {
        delete this[key]
      }
      if (['', undefined].includes(this[key])) {
        delete this[key]
      }
    })

    return this
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
