<template>
    <div class="news page">
        <div>
            <h1>{{ newsText }}</h1>
            <br><br>
        </div>
        <div class="news-list">
            <div class="loading" v-if="!news.length"><h1>loading...</h1>s</div>
            <div class="item" v-for="item in news">
                {{item.title}}
            </div>
        </div>
    </div>
</template>

<script>
import * as postsService from '../services/posts.service'

export default {
    name: 'News',
    data () {
        return {
            newsText: 'News Component !!!',
            news: []
        }
    },

    methods: {

    },

    mounted () {
        postsService.getPosts()
            .then(response => {
                console.log('response', response)
                this.news = response.data.content
            }).catch(error => console.log(error.message))
    }
}
</script>
