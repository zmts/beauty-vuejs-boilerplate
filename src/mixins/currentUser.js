export default {
  computed: {
    $currentUser () {
      return this.$store.state.user.currentUser
    }
  }
}
