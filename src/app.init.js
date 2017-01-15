import Vue from 'vue'
import { router } from './app.router'

new Vue({
    template: '<root-layout/>',
    components: {
        RootLayout: require('./root.layout.vue')
    },
    router
}).$mount('#app')
