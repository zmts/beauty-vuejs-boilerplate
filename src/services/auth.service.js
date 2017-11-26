import axios from 'axios'
import Http from '../services/http.init'
import $store from '../store'
import $router from '../router'

import * as CONFIG from '../app.config'

/**
 ******************************
 * @API
 ******************************
 */

export function makeLogin ({email, password}) {
    return axios.post(`${CONFIG.API_URL}/auth/signin`, {
        email,
        password
    }).then(response => {
        _setAuthData(response)
        return response
    }).catch(error => new Error(error))
}

export function refreshTokens () {
    return axios.post(`${CONFIG.API_URL}/auth/refresh-tokens`, {
        refreshToken: localStorage.getItem('refreshToken')
    }).then(response => {
        _setAuthData(response)
        return response
    }).catch(error => new Error(error))
}

export function makeLogout () {
    return new Http({auth: true}).post(`${CONFIG.API_URL}/auth/signout`, {})
        .then(() => {
            _resetAuthData()
            $router.push({name: 'index'})
        }).catch(error => new Error(error))
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
