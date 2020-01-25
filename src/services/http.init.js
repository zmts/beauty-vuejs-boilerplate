/**
 * HTTP request layer
 * if auth is required return patched axios instance(with access token in headers)
 * else return clear axios instance
 */

import axios from 'axios'

import * as authService from '../services/auth.service'
import { API_URL } from '../.env'

export default class Http {
  constructor (status) {
    this.isAuth = status && status.auth ? status.auth : false
    this.instance = axios.create({
      baseURL: API_URL
    })

    return this.init()
  }

  init () {
    if (this.isAuth) {
      this.instance.interceptors.request.use(request => {
        request.headers.authorization = authService.getBearer()
        // if access token expired and refreshToken is exist >> go to API and get new access token
        if (authService.isAccessTokenExpired() && authService.getRefreshToken()) {
          return authService.refreshTokens()
            .then(response => {
              authService.setBearer(response.data.accessToken)
              return request
            }).catch(error => Promise.reject(error))
        } else {
          return request
        }
      }, error => {
        return Promise.reject(error)
      })
    }

    return this.instance
  }
}
