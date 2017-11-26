/**
 * request constructor class
 * if auth is required return patched axios instance
 * else return clear axios instance
 */

import axios from 'axios'

import $router from '../router'
import $store from '../store'
import * as authService from '../services/auth.service'

export class Http {
    constructor (status) {
        this.isAuth = status && status.auth ? status.auth : false
        this.instance = axios.create()

        if (this.isAuth) {
            this.instance.interceptors.request.use(request => {
                request.headers['token'] = localStorage.getItem('accessToken')
                // if access token expired >> go to API and get new access token
                if ($store.state.accessTokenExpDate <= (Math.floor(new Date().getTime() / 1000))) {
                    return authService.refreshTokens()
                        .then(response => {
                            request.headers['token'] = response.data.accessToken
                            return request
                        })
                        .catch(error => {
                            if (error.response.data.badRefreshToken) {
                                console.log('http.init.js >> badRefreshToken: true')
                                $store.commit('SET_USER', {})
                            }
                            if (error.response.data.refreshTokenExpiredError) {
                                console.log('http.init.js >> refreshTokenExpiredError')
                                $store.commit('SET_USER', {})
                                $router.push('/')
                            }
                        })
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
