import * as Fingerprint2 from 'fingerprintjs2'
import axios from 'axios'
import Http from './http.init'
import { ResponseWrapper, ErrorWrapper } from './util'
import $store from '../store'
import $router from '../router'

import { API_URL } from '../.env'

let BEARER = ''

/**
 ******************************
 * @API
 ******************************
 */

export async function makeLogin ({ email, password }) {
  const fingerprint = await _getFingerprint()

  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/auth/login`, { email, password, fingerprint })
      .then(response => {
        _setAuthData({
          refreshToken: response.data.data.refreshToken,
          accessToken: response.data.data.accessToken,
          exp: _parseTokenData(response.data.data.accessToken).exp
        })
        return resolve(new ResponseWrapper(response, response.data))
      }).catch(error => reject(new ErrorWrapper(error)))
  })
}

export function makeLogout () {
  return new Promise((resolve, reject) => {
    new Http({ auth: true }).post('auth/logout', { refreshToken: getRefreshToken() })
      .then(response => {
        _resetAuthData()
        $router.push({ name: 'login' })
        return resolve(new ResponseWrapper(response, response.data))
      }).catch(error => reject(new ErrorWrapper(error)))
  })
}

export async function refreshTokens () {
  const fingerprint = await _getFingerprint()

  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/auth/refresh-tokens`, {
      refreshToken: getRefreshToken(),
      fingerprint
    }).then(response => {
      _setAuthData({
        refreshToken: response.data.data.refreshToken,
        accessToken: response.data.data.accessToken,
        exp: _parseTokenData(response.data.data.accessToken).exp
      })
      return resolve(new ResponseWrapper(response, response.data))
    }).catch(error => {
      console.log(error.response.data.code)
      _resetAuthData()
      $router.push({ name: 'login' })
      return reject(new ErrorWrapper(error))
    })
  })
}

/**
 ******************************
 * @methods
 ******************************
 */

export function isAccessTokenExpired () {
  const accessTokenExpDate = $store.state.auth.accessTokenExpDate - 10
  const nowTime = Math.floor(new Date().getTime() / 1000)

  return accessTokenExpDate <= nowTime
}

export function getRefreshToken () {
  return localStorage.getItem('refreshToken')
}

export function setRefreshToken (refreshToken) {
  localStorage.setItem('refreshToken', refreshToken)
}

export function getBearer () {
  return BEARER
}

export function setBearer (accessToken) {
  BEARER = `Bearer ${accessToken}`
}

/**
 ******************************
 * @private_methods
 ******************************
 */

function _parseTokenData (accessToken) {
  let payload = ''
  let tokenData = {}

  try {
    payload = accessToken.split('.')[1]
    tokenData = JSON.parse(atob(payload))
  } catch (error) {
    throw new Error(error)
  }

  return tokenData
}

function _resetAuthData () {
  // reset userData in store
  $store.commit('user/SET_CURRENT_USER', {})
  $store.commit('auth/SET_ATOKEN_EXP_DATE', null)
  // reset tokens
  setRefreshToken('')
  setBearer('')
}

function _setAuthData ({ refreshToken, accessToken, exp } = {}) {
  setRefreshToken(refreshToken)
  setBearer(accessToken)
  $store.commit('auth/SET_ATOKEN_EXP_DATE', exp)
}

function _getFingerprint () {
  return new Promise((resolve, reject) => {
    async function getHash () {
      const options = {
        excludes: {
          plugins: true,
          localStorage: true,
          adBlock: true,
          screenResolution: true,
          availableScreenResolution: true,
          enumerateDevices: true,
          pixelRatio: true,
          doNotTrack: true
        }
      }

      try {
        const components = await Fingerprint2.getPromise(options)
        const values = components.map(component => component.value)
        console.log('fingerprint hash components', components)

        return String(Fingerprint2.x64hash128(values.join(''), 31))
      } catch (e) {
        reject(e)
      }
    }

    if (window.requestIdleCallback) {
      console.log('get fp hash @ requestIdleCallback')
      requestIdleCallback(async () => resolve(await getHash()))
    } else {
      console.log('get fp hash @ setTimeout')
      setTimeout(async () => resolve(await getHash()), 500)
    }
  })
}
