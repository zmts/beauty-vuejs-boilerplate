// TODO WIP
export function routePropResolver (routeOptions) {
  let { query } = routeOptions
  let resultQueryParams = {}

  Object.keys(query).forEach(key => {
    if (Number(query[key])) {
      resultQueryParams[key] = +query[key]
    }
    if ((typeof query[key] === 'string') && query[key].length && !['0', 'null', 'undefined', 'NaN'].includes(query[key])) {
      resultQueryParams[key] = query[key]
    }
  })
  return resultQueryParams
}
