<template>
    <div class="profile page">
        <h1>{{msg}}</h1><br><br>

        <router-view v-if="$currentUser.id"></router-view>

    </div>
</template>

<script>
    export default {
        name: 'ProfilePage',
        data () {
            return {
                msg: 'Welcome to profile!!!'
            }
        }
    }
</script>
