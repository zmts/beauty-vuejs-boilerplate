/**
 * get query params from URL(via default vue query object)
 * and pass it to component props
 */
export function routePropResolver (routeOptions) {
  const { query } = routeOptions
  const resultQuery = {}

  Object.keys(query).forEach(key => {
    // parse strings
    if (query[key].length && !['0', 'null', 'undefined', 'NaN'].includes(query[key])) {
      resultQuery[key] = query[key]
    }
    // parse numbers
    if (parseInt(query[key])) {
      resultQuery[key] = +query[key]
    }
  })
  return resultQuery
}

/**
 * validate route limit
 * API have default limit equals to 10, so we don't need send it
 * @param {int} limit
 * @return {boolean}
 */
export function isValidLimitQuery (limit) {
  return [20, 30, 40, 50, 100].includes(+limit)
}

/**
 * validate route page
 * API have default page equals to 0, so we don't need send it
 * @param {int} page
 * @return {boolean}
 */
export function isValidPageQuery (page) {
  return +page >= 1
}
