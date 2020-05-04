export class AssertionError extends Error {
  constructor (message) {
    super(message)
    this.message = message || 'SPA assertion error'
    this.code = 'SPA_ASSERTION_ERROR'
  }
}
