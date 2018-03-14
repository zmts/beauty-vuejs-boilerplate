// TODO WIP
export function routePropResolver (routeOptions) {
  let { query } = routeOptions
  let resultQueryParams = {}

  Object.keys(query).forEach(key => {
    if (Number(query[key]) && +query[key]) {
      resultQueryParams[key] = +query[key]
    }
    if (String(query[key]) && query[key].length && !['0', 'null', 'undefined', 'NaN'].includes(query[key])) {
      resultQueryParams[key] = query[key]
    }
  })
  return resultQueryParams
}
