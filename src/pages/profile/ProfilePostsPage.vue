<template>
  <div class="posts">
    <div class="list">
      <div class="loading" v-if="!posts.length"><h1>loading...</h1></div>
      <div class="item" v-for="item in posts" :key="item.id">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ProfilePostsPage',
  data () {
    return {
      //
    }
  },

  methods: {
    fetchData () {
      this.$store.dispatch('profilePosts/getCurrentUserPosts')
    }
  },

  computed: {
    ...mapState('profilePosts', {
      posts: 'items',
      pagination: 'pagination',
      error: 'error',
      loading: 'loading'
    }),
    ...mapGetters('news', [
      'isEmpty'
    ])
  },

  mounted () {
    this.fetchData()
  }
}
</script>
