<template>
  <div class="header wrapper">
    <UiToastList/>

    <div class="menu-wrapper">
      <ul class="menu">
        <li>
          <router-link :to="{ path: '/' }" exact>Home</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/news' }">News</router-link>
        </li>
      </ul>
      <ul class="menu side">
        <li v-if="!$currentUser.id">
          <router-link :to="{ path: '/login' }">login</router-link>
        </li>
        <li v-if="$currentUser.id">
          <router-link :to="{ path: '/profile' }">profile</router-link>
        </li>
        <li v-if="$currentUser.id"><span class="logout-button" @click="logout()">logout</span></li>
      </ul>
    </div>

  </div>

</template>

<script>
  //    import AppLogin from '@/components/login.component'
  import UiToastList from '@/components/UiToastList'
  import * as authService from '../services/auth.service'

  export default {
    name: 'Header',
    components: {
      UiToastList
//            AppLogin
    },
    methods: {
      logout () {
        authService.makeLogout()
      }
    }
  }
</script>

<style lang="scss" scoped>

  .header {
    z-index: 1;
    padding: 20px 0;
    position: relative;

    .is-active {
      color: #e01b3c;
    }

    a {
      color: #000;
      text-decoration: none;
    }

    .menu-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .menu {
      font-size: 25px;
      text-transform: uppercase;
      display: flex;
      justify-content: center;

      li {
        padding: 15px;

      }

      &.side {
        font-size: 15px;

        .logout-button {
          cursor: pointer;
        }
      }
    }

  }

</style>
