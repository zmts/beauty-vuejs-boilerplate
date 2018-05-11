<template>
  <div class="header wrapper">
    <UiToastList/>

    <div class="menu-wrapper">
      <ul class="menu">
        <li>
          <router-link :to="{ name: 'index' }" exact>Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'news' }">News</router-link>
        </li>
      </ul>
      <ul class="menu side">
        <li v-if="!$currentUser.id">
          <router-link :to="{ name: 'login' }">login</router-link>
        </li>
        <li v-if="$currentUser.id">
          <router-link :to="{ name: 'profile' }">profile</router-link>
        </li>
        <li v-if="$currentUser.id"><span class="logout-button" @click="logout()">logout</span></li>
        <li>
          <UiMenu>
            <ul>
              <li><router-link :to="{ name: 'index' }" exact>home</router-link></li>
              <li><router-link :to="{ name: 'news' }">news</router-link></li>
              <li><router-link :to="{ name: 'login' }">login</router-link></li>
              <li>hello</li>
            </ul>
          </UiMenu>
        </li>
      </ul>
    </div>

  </div>

</template>

<script>
  import * as authService from '../services/auth.service'

  import UiMenu from '@/components/UiMenu.vue'
  import UiToastList from '@/components/UiToastList'

  export default {
    name: 'Header',
    components: {
      UiToastList,
      UiMenu
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
      align-items: center;

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
