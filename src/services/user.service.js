import Http from './http.init'
import { ResponseWrapper, ErrorWrapper } from './util'
import * as CONFIG from '../app.config'
const ENTITY = 'users'

export function getById (user_id) {
    return new Promise((resolve, reject) => {
        return new Http({auth: true}).get(`${CONFIG.API_URL}/${ENTITY}/${user_id}`)
            .then(response => {
                resolve(new ResponseWrapper(response, response.data.data))
            })
            .catch(error => {
                let message = error.response.data ? error.response.data.error : error.response.statusText
                reject(new ErrorWrapper(error, message))
            })
    })
}

export function getCurrent () {
    return new Promise((resolve, reject) => {
        return new Http({auth: true}).get(`${CONFIG.API_URL}/${ENTITY}/current`)
            .then(response => {
                resolve(new ResponseWrapper(response, response.data.data))
            })
            .catch(error => {
                let message = error.response.data ? error.response.data.error : error.response.statusText
                reject(new ErrorWrapper(error, message))
            })
    })
}

export function getPostsByUserId (user_id) {
    return new Promise((resolve, reject) => {
        new Http({auth: true}).get(`${CONFIG.API_URL}/${ENTITY}/${user_id}/posts`)
            .then(response => {
                let data = {
                    content: response.data.data,
                    total: response.data.data.total ? response.data.data.total : ''
                }
                resolve(new ResponseWrapper(response, data))
            })
            .catch(error => {
                let message = error.response.data ? error.response.data.error : error.response.statusText
                reject(new ErrorWrapper(error, message))
            })
    })
}
