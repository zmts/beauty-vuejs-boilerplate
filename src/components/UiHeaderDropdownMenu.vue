<template>
  <div class="ui-header-dropdown-menu component">
    <UiBaseMenuDropdown>
      <ul>
        <li><router-link :to="{ name: 'index' }" exact>home</router-link></li>
        <li><router-link :to="{ name: 'news' }">news</router-link></li>
        <li><router-link :to="{ name: 'login' }">login</router-link></li>
        <li>hello</li>
      </ul>
    </UiBaseMenuDropdown>
  </div>
</template>

<script>
import UiBaseMenuDropdown from './UiBaseMenuDropdown'

export default {
  name: 'UiHeaderDropdownMenu',
  components: { UiBaseMenuDropdown }
}
</script>
