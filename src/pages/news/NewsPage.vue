<template>
  <div class="news page">
    <div>
      <h1>{{ newsText }}</h1>
      <br><br>
    </div>

    <div class="news-list">
      <DataBox :loading="loading" :isEmpty="isEmpty" :error="error">
        <div class="item" v-for="item in news" :key="item.id">
          {{item.title}}
        </div>
      </DataBox>
    </div>

  </div>
</template>

<script>
import { PostsService } from '@/services/posts.service'

import prepareQueryParamsMixin from '../../mixins/prepareQueryParamsMixin'
import prepareFetchParamsMixin from '../../mixins/prepareFetchParamsMixin'

import DataBox from '../../components/DataBox'

export default {
  name: 'NewsPage',
  mixins: [prepareQueryParamsMixin, prepareFetchParamsMixin],
  components: {
    DataBox
  },

  props: {
    limit: { type: Number, default: 10 },
    offset: { type: Number, default: 0 }
  },

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
      newsText: 'NewsPage Component',
      news: [],
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
        const { data } = await PostsService.getListPublic(this.fetchParams)
        this.news = data.content
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
    isEmpty () {
      return this.news && !this.news.length
    },

    useInUrlQueryPropList () {
      return this.prepareQueryParamsMixin({
        limit: this.pagination.limit,
        offset: this.pagination.offset
      })
    },
    fetchParams () {
      const pagination = this.prepareFetchParamsMixin({
        limit: this.pagination.limit,
        offset: this.pagination.offset
      })

      return { ...pagination }
    }
  },

  created () {
    this.fetchData()
  }
}
</script>
