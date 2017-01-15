<template>
<div>
    <h1>{{ msg }}</h1>
        <router-link to="/">Home</router-link>
        <router-link to="/news">News</router-link>
</div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'Header title',
            items: [0, 1, 2]
        }
    }
}
</script>

<style scoped>

</style>
