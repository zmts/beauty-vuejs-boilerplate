import { Http } from './http.init'
import { ResponseWrapper, ErrorWrapper } from './util'
const ENTITY = 'posts'

export function getPosts () {
  return new Promise((resolve, reject) => {
    new Http().get(`${ENTITY}`)
      .then(response => {
        let data = {
          content: response.data.data.results,
          total: response.data.data.total
        }
        resolve(new ResponseWrapper(response, data))
      })
      .catch(error => {
        let message = error.response.data ? error.response.data.error : error.response.statusText
        reject(new ErrorWrapper(error, message))
      })
  })
}
