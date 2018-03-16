import forEach from 'lodash/forEach'
import { isValidLimitQuery, isValidPageQuery } from '../router/util'

/**
 * main fetch params validation
 */
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
        if ((typeof item === 'number') && item) {
          obj[prop] = item
        }

        if ((prop === 'limit') && !isValidLimitQuery(+item)) {
          delete obj[prop]
        }
        if ((prop === 'page') && !isValidPageQuery(+item)) {
          delete obj[prop]
        }
      })

      return obj
    }
  }
}
