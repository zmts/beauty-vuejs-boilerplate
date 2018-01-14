import { Http } from './http.init'
import { ResponseWrapper, ErrorWrapper } from './util'

export class BaseService {
  static request (status) {
    return new Http(status)
  }

  static responseWrapper (...rest) {
    return new ResponseWrapper(...rest)
  }

  static errorWrapper (...rest) {
    return new ErrorWrapper(...rest)
  }
}
