import { isValidLimitQuery, isValidPageQuery } from '@/router/util'

/**
 * main fetch params validation
 */
export default {
  methods: {
    prepareFetchParamsMixin (data) {
      const obj = {}
      Object.keys(data).forEach(key => {
        if (Array.isArray((data[key])) && data[key].length) {
          obj[key] = data[key]
        }
        if (typeof data[key] === 'boolean' && data[key]) {
          obj[key] = data[key]
        }
        if (typeof data[key] === 'string' && data[key].length) {
          obj[key] = data[key]
        }
        if ((typeof data[key] === 'number') && data[key]) {
          obj[key] = data[key]
        }

        if ((key === 'limit') && !isValidLimitQuery(+data[key])) {
          delete obj[key]
        }
        if ((key === 'page') && !isValidPageQuery(+data[key])) {
          delete obj[key]
        }
      })

      return obj
    }
  }
}
