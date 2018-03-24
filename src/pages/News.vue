<template>
  <div class="news page">
    <div>
      <h1>{{ newsText }}</h1>
      <br><br>
    </div>

    <div class="news-list">
      <UiDataBox :loading="loading" :isEmpty="isEmpty" :error="error">
        <div class="item" v-for="item in news">
          {{item.title}}
        </div>
      </UiDataBox>
    </div>

  </div>
</template>

<script>
  import PostsService from '../services/posts.service'
  import prepareQueryParamsMixin from '../mixins/prepareQueryParamsMixin'
  import prepareFetchParamsMixin from '../mixins/prepareFetchParamsMixin'

  export default {
    name: 'News',
    mixins: [prepareQueryParamsMixin, prepareFetchParamsMixin],

    props: {
      limit: {
        type: Number,
        default: 10
      },
      page: {
        type: Number,
        default: 0
      }
    },

    watch: {
      'pagination': {
        handler: function () {
          this.$router.replace({
            query: this.useInUrlQueryPropList
          })
          this.fetchData()
        },
        deep: true
      }
    },

    data () {
      return {
        loading: false,
        error: false,

        newsText: 'NewsPage Component',
        news: [],

        pagination: {
          limit: this.limit,
          page: this.page,
          total: 0
        }
      }
    },

    methods: {
      fetchData () {
        this.loading = true
        PostsService.getListPublic(this.fetchParams)
          .then(response => {
            this.news = response.data.content
            this.pagination.total = response.data.total
          }).catch(error => (this.error = error.message))
          .finally(() => (this.loading = false))
      }
    },

    computed: {
      useInUrlQueryPropList () {
        return this.prepareQueryParamsMixin({
          limit: this.pagination.limit,
          page: this.pagination.page
        })
      },
      fetchParams () {
        const pagination = this.prepareFetchParamsMixin({
          limit: this.pagination.limit,
          page: this.pagination.page
        })

        return { ...pagination }
      },
      isEmpty () {
        return !this.news.length
      }
    },

    created () {
      this.fetchData()
    }
  }
</script>
