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
import { PostsService } from '@/services/posts.service'
import prepareQueryParamsMixin from '../../mixins/prepareQueryParamsMixin'
import prepareFetchParamsMixin from '../../mixins/prepareFetchParamsMixin'

export default {
  name: 'ProfilePostsPage',

  props: {
    limit: { type: Number, default: 10 },
    offset: { type: Number, default: 0 }
  },

  mixins: [prepareQueryParamsMixin, prepareFetchParamsMixin],

  watch: {
    'pagination.limit': function () {
      this.$router.replace({
        query: this.useInUrlQueryPropList
      })
      this.fetchData()
    },
    'pagination.offset': function () {
      this.$router.replace({
        query: this.useInUrlQueryPropList
      })
      this.fetchData()
    }
  },

  data () {
    return {
      posts: [],
      error: false,
      loading: false,
      pagination: {
        limit: this.limit,
        offset: this.offset,
        total: 0
      }
    }
  },

  methods: {
    async fetchData () {
      this.loading = true

      try {
        const { data } = await PostsService.getPostsByUserId(this.fetchParams)
        this.posts = data.content
        this.pagination.total = data.total
      } catch (e) {
        this.$store.commit('toast/NEW', { type: 'error', message: e.message, e })
        this.error = e.message
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  },

  computed: {
    filter () {
      return {
        userId: this.$currentUser.id
      }
    },
    useInUrlQueryPropList () {
      return this.prepareQueryParamsMixin({
        limit: this.pagination.limit,
        offset: this.pagination.offset
      })
    },
    fetchParams () {
      const filter = this.prepareFetchParamsMixin(this.filter)

      const pagination = this.prepareFetchParamsMixin({
        limit: this.pagination.limit,
        offset: this.pagination.offset
      })

      return { filter, ...pagination }
    },
    isEmpty () {
      return this.posts && !this.posts.length
    }
  },

  mounted () {
    this.fetchData()
  }
}
</script>
