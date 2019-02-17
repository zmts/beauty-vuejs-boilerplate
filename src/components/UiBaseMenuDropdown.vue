<template>
  <UiOnClickOutside :do="hideContent">
    <div class="ui-base-menu-dropdown component">
      <div class="icon-wrapper" @click="toggleMenu">
        <slot name="icon">
          <div class="default-menu-icon">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </slot>
      </div>

      <div class="content" v-if="isShown" @click="hideContent">
        <slot></slot>
      </div>
    </div>
  </UiOnClickOutside>
</template>

<script>
import UiOnClickOutside from './UiOnClickOutside'

export default {
  name: 'UiBaseMenuDropdown',
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    listType: {
      type: Boolean,
      default: true
    }
  },

  components: {
    UiOnClickOutside
  },

  data () {
    return {
      isShown: false
    }
  },
  methods: {
    toggleMenu () {
      this.isShown = !this.isShown
    },
    hideContent () {
      if (this.isShown) this.isShown = false
    }
  },

  mounted () {
    if (!this.$slots.default) {
      throw new Error('Please define default slot content!')
    }
    if (this.listType && (this.$slots.default[0].tag !== 'ul')) {
      throw new Error(`Wrong template! Please use <ul> tag as default slot to define menu list:
      <UiMenu>
        <ul>
          <li>hello</li>
          <li>bye</li>
        </ul>
      <UiMenu>
      `)
    }
  }
}
</script>

<style lang="scss">
.ui-base-menu-dropdown.component {
  display: flex;
  position: relative;
  .icon {
  }
  .default-menu-icon {
    cursor: pointer;
    .line {
      margin: 2px 0;
      width: 25px;
      height: 4px;
      background-color: #cccccc;
    }
  }
  .content {
    min-width: 150px;
    border: 1px solid $color-black-transparent;
    border-radius: 4px;
    padding: 5px 0;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: $color-white;
    ul li {
      line-height: 45px;
      padding: 0 15px;
      &:hover {
        background-color: $color-black-transparent;
        cursor: pointer;
      }
      a {
        color: inherit;
        display: block;
      }
    }
  }
}
</style>
