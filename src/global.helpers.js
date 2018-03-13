export default function () {
  window.required = paramName => {
    throw new Error(`${paramName || 'Required'} parameter not supplied`)
  }
}
