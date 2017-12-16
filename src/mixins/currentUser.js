export default {
  computed: {
    $currentUser () {
      return {
        id: this.$store.state.userData.id,
        name: this.$store.state.userData.name,
        role: this.$store.state.userData.role,
        email: this.$store.state.userData.email
      }
    }
  }
}
