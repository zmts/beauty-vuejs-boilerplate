<template>
  <div id="app">
    <AppHeader></AppHeader>
    <div class="wrapper">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
    <AppFooter></AppFooter>
  </div>

</template>

<script>
  import AppHeader from '@/components/Header'
  import AppFooter from '@/components/Footer'

  export default {
    name: 'AppLayout',
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>s
