/**
 * Jump to some DOM element
 */
export default {
  methods: {
    $jumpTo (selector) {
      const el = document.querySelectorAll(selector)[0]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        throw new Error('Element not supplied.')
      }
    }
  }
}

// Usage example >>
// someSubmitHandler () {
//   this.$v.$touch()
// // must be used only after touch function
//   this.$nextTick(() => {
//     if (this.$v.item.$invalid) this.jumpTo('.is-error')
//   });
// };
