<template>
<div>
    <h1>News Component</h1>
</div>
</template>

<script>
import { CONFIG } from '../app.config'
import { newsService } from '../services/news.service'

export default {
    data: function () {
        return {
            //
        }
    },

    created: function () {
        newsService.getNews()
        console.log(CONFIG.API_URL)
    }
}
</script>

<style scoped>

</style>
