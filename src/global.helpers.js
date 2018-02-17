export default function () {
  window.required = () => {
    throw new Error('Required parameter not supplied')
  }
}
