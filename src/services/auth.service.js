import * as Fingerprint2 from 'fingerprintjs2'
import * as UAParser from 'ua-parser-js'
import axios from 'axios'

import { Http } from './http.init'
import { ResponseWrapper, ErrorWrapper } from './util'
import $store from '../store'
import $router from '../router'

import { API_URL } from '../.env'

let BEARER = ''

export class AuthService {
  /**
   ******************************
   * @API
   ******************************
   */

  static async makeLogin ({ email, password }) {
    try {
      const fingerprint = await _getFingerprint()
      const response = await axios.post(`${API_URL}/auth/login`,
        { email, password, fingerprint },
        { withCredentials: true })
      _setAuthData({
        accessToken: response.data.data.accessToken,
        exp: _parseTokenData(response.data.data.accessToken).exp
      })
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async makeLogout () {
    try {
      const response = await new Http({ auth: true }).post('auth/logout', {}, { withCredentials: true })
      _resetAuthData()
      $router.push({ name: 'login' }).catch(() => {})
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async refreshTokens () {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh-tokens`, {
        fingerprint: await _getFingerprint()
      }, { withCredentials: true })

      _setAuthData({
        accessToken: response.data.data.accessToken,
        exp: _parseTokenData(response.data.data.accessToken).exp
      })
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      console.log(error.response.data.code)
      _resetAuthData()
      $router.push({ name: 'login' }).catch(() => {})
      throw new ErrorWrapper(error)
    }
  }

  static debounceRefreshTokens = this._debounce(() => {
    return this.refreshTokens()
  }, 100)

  /**
   ******************************
   * @METHODS
   ******************************
   */

  static isAccessTokenExpired () {
    const accessTokenExpDate = $store.state.auth.accessTokenExpDate - 10
    const nowTime = Math.floor(new Date().getTime() / 1000)

    return accessTokenExpDate <= nowTime
  }

  static hasRefreshToken () {
    return Boolean(localStorage.getItem('refreshToken'))
  }

  static setRefreshToken (status) {
    if (!['', 'true'].includes(status)) {
      throw new Error(`setRefreshToken: invalid value ${status}; Expect one of ['', 'true']`)
    }

    localStorage.setItem('refreshToken', status)
  }

  static getBearer () {
    return BEARER
  }

  static setBearer (accessToken) {
    BEARER = `Bearer ${accessToken}`
  }

  /**
   * https://stackoverflow.com/questions/35228052/debounce-function-implemented-with-promises
   * @param inner
   * @param ms
   * @returns {function(...[*]): Promise<unknown>}
   * @private
   */
  static _debounce (inner, ms = 0) {
    let timer = null
    let resolves = []

    return function () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const result = inner()
        resolves.forEach(r => r(result))
        resolves = []
      }, ms)

      return new Promise(resolve => resolves.push(resolve))
    }
  }
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
  AuthService.setRefreshToken('')
  AuthService.setBearer('')
}

function _setAuthData ({ accessToken, exp } = {}) {
  AuthService.setRefreshToken('true')
  AuthService.setBearer(accessToken)
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
          doNotTrack: true,
          preprocessor: (key, value) => {
            if (key === 'userAgent') {
              const parser = new UAParser(value)
              // return customized user agent (without browser version)
              return `${parser.getOS().name} :: ${parser.getBrowser().name} :: ${parser.getEngine().name}`
            }
            return value
          }
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
