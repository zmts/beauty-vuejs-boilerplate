<template>
    <div class="posts">
        <div class="list">
            <div class="loading" v-if="!posts.length"><h1>loading...</h1></div>
            <div class="item" v-for="item in posts">
                {{item.title}}
            </div>
        </div>
    </div>
</template>

<script>
    import * as userService from '../../services/user.service'

    export default {
        name: 'PostsPage',
        data () {
            return {
                posts: []
            }
        },
        mounted () {
            userService.getPostsByUserId(this.$currentUser.id)
                .then(response => { this.posts = response.data.content })
                .catch(error => console.log(error.message))
        }
    }
</script>
