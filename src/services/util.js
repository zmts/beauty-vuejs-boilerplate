/**
 * Return message for HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} Message of network operation
 */
function _getResponseMessage (status) {
    let message = ''
    switch (status) {
    case 200:
        message = 'Data successfully fetched'
        break
    case 201:
        message = 'Data successfully created'
        break
    case 400:
        message = 'Validation error'
        break
    case 401:
        message = 'Need auth'
        break
    case 404:
        message = 'Not found'
        break
    case 503:
        message = 'Service Unavailable'
        break
    default:
        message = 'Something wrong. Default error message'
        break
    }
    return message
}

/**
 * Create instant, which represent response object
 * @param {Object} [data] - custom data
 * @param {Object} [response] - axios response object
 * @param {String} [message] - custom message to display
 */
export class ResponseWrapper {
    constructor (response, data = {}, message) {
        this.data = data
        this.success = response.data.success
        this.status = response.status
        this.message = message || _getResponseMessage(response.status)
    }
}

/**
 * Create instant, which represent error object
 * @param {Object} [error] - axios error object
 * @param {String} [message] - custom message to display
 */
export class ErrorWrapper extends Error {
    constructor (error, message) {
        super()
        this.name = 'ErrorWrapper'
        this.stack = new Error().stack
        this.success = error.response ? error.response.data.success : false
        this.status = error.response ? error.response.status : 503
        this.message = message || _getResponseMessage(this.status)
    }
}
