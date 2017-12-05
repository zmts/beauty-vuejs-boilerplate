import axios from 'axios'
import { Http } from './http.init'
import $store from '../store'
import $router from '../router'

import { API_URL } from '../app.config'

/**
 ******************************
 * @API
 ******************************
 */

export function makeLogin ({email, password}) {
    return axios.post(`${API_URL}/auth/signin`, {
        email,
        password
    }).then(response => {
        _setAuthData(response)
        return response
    }).catch(error => { throw new Error(error) })
}

export function refreshTokens () {
    return axios.post(`${API_URL}/auth/refresh-tokens`, {
        refreshToken: localStorage.getItem('refreshToken')
    }).then(response => {
        _setAuthData(response)
        return response
    }).catch(error => {
        if (error.response.data.badRefreshToken) {
            $store.commit('SET_USER', {})
            throw new Error('http.init.js >> badRefreshToken: true')
        }
        if (error.response.data.refreshTokenExpiredError) {
            $store.commit('SET_USER', {})
            $router.push({name: 'index'})
            throw new Error('http.init.js >> refreshTokenExpiredError')
        }
    })
}

export function makeLogout () {
    return new Http({auth: true}).post(`auth/signout`)
        .then(() => {
            _resetAuthData()
            $router.push({name: 'index'})
        }).catch(error => { throw new Error(error) })
}

/**
 ******************************
 * @methods
 ******************************
 */

function _resetAuthData () {
    // reset userData in store
    $store.commit('SET_USER', {})
    $store.commit('SET_ATOKEN_EXP_DATE', null)
    // reset tokens in localStorage
    localStorage.setItem('refreshToken', '')
    localStorage.setItem('accessToken', '')
}

function _setAuthData (response) {
    localStorage.setItem('refreshToken', response.data.refreshToken)
    localStorage.setItem('accessToken', response.data.accessToken)
    $store.commit('SET_ATOKEN_EXP_DATE', response.data.expires_in)
}
