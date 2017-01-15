<template>
<div>
    <h1>{{ msg }}</h1>
        <router-link :to="{ name: 'index' }" exact>Home</router-link>
        <router-link :to="{ name: 'news' }">News</router-link>
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

a {
    padding: 10px;
}

.is-active{
    color: red;
    border: 1px solid red;
}

</style>
