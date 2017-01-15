<template>
<div class="main">
    <header-component></header-component>
        <router-view></router-view>
    <footer-component></footer-component>
</div>
</template>

<script>
export default {
    components: {
        HeaderComponent: require('./components/header.component'),
        FooterComponent: require('./components/footer.component')
    }
}
</script>

<style>
.main {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
