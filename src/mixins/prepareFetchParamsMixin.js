import forEach from 'lodash/forEach'

export default {
  methods: {
    prepareFetchParamsMixin (data) {
      let obj = {}
      forEach(data, (item, prop) => {
        if (Array.isArray((item)) && item.length) {
          obj[prop] = item
        }
        if (typeof item === 'boolean' && item) {
          obj[prop] = item
        }
        if (typeof item === 'string' && item.length) {
          obj[prop] = item
        }
        if (typeof item === 'number' && item) {
          obj[prop] = item
        }
      })

      return obj
    }
  }
}
