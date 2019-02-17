<!-- https://codesandbox.io/s/qvow6lvp64 -->
<script>
export default {
  name: 'UiOnClickOutside',
  props: ['do'],
  mounted () {
    const listener = e => {
      if (e.target !== this.$el && !this.$el.contains(e.target)) {
        this.do()
      }
    }
    document.addEventListener('click', listener, true)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('click', listener, true)
    })
  },
  render () {
    return this.$slots.default[0]
  }
}
</script>
