<template>
  <span class="ui-icon-base component" v-on="$listeners">
    <component
      :is="iconName"
      :width="width"
      :height="height"
      :color="color">
    </component>
  </span>
</template>

<script>
import write from './write'
import moon from './moon'
import done from './done'
import arrowDown from './arrowDown'
import sort from './sort'
import sortDown from './sortDown'
import sortUp from './sortUp'

export default {
  name: 'UiIconBase',
  props: {
    iconName: {
      type: String,
      default: 'moon'
    },
    width: {
      type: String,
      default: '18px'
    },
    height: {
      type: String,
      default: '18px'
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  },

  components: {
    write,
    moon,
    done,
    arrowDown,
    sort,
    sortDown,
    sortUp
  }
}
</script>

<style lang="scss" scoped>
.ui-icon-base.component {
  display: inline-block;
}
</style>
