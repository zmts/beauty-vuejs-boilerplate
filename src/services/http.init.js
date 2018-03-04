/**
 * request constructor class
 * if auth is required return patched axios instance
 * else return clear axios instance
 */

import axios from 'axios'

import * as authService from '../services/auth.service'
import { API_URL } from '../.env'

export class Http {
  constructor (status) {
    this.isAuth = status && status.auth ? status.auth : false
    this.instance = axios.create({
      baseURL: API_URL
    })

    if (this.isAuth) {
      this.instance.interceptors.request.use(request => {
        request.headers['token'] = localStorage.getItem('accessToken')
        // if access token expired and refreshToken is exist >> go to API and get new access token
        if (authService.isAccessTokenExpired() && authService.getRefreshToken()) {
          return authService.refreshTokens()
            .then(response => {
              request.headers['token'] = response.data.accessToken
              return request
            }).catch(error => console.log(error))
        } else {
          return request
        }
      }, error => {
        return Promise.reject(error)
      })

      return this.instance
    }
    return this.instance
  }
}
