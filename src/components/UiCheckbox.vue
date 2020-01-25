<template>
  <div class="ui-checkbox component">
    <UiBaseIcon class="ok" width="8px" iconName="done"/>
    <input
      :id="labelId"
      :checked="checked"
      v-on="listeners"
      type="checkbox">
    <label :for="labelId"></label>
  </div>
</template>

<script>
import UiBaseIcon from '../components/icons/UiBaseIcon'

export default {
  name: 'UiCheckbox',

  props: {
    checked: { type: Boolean, required: true }, // v-model
    value: { type: [String, Number, Boolean] }
  },

  model: {
    prop: 'checked',
    event: 'change'
  },

  components: {
    UiBaseIcon
  },

  methods: {
    getRandomInt () {
      const min = 1
      const max = 1000000000
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  },

  computed: {
    labelId () {
      return `inputId${this.getRandomInt()}`
    },
    listeners () {
      return {
        ...this.$listeners,
        change: event => this.$emit('change', event.target.checked)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.ui-checkbox.component {
  width: 15px;
  height: 15px;
  display: inline-block;
  color: white;
  position: relative;

  .ok {
    position: absolute;
    left: 3px;
    bottom: -2px;
    pointer-events: none;
  }

  input {
    display: none;
  }

  input:checked + label {
    border: 1px solid orange;
    background-color: orange;
  }

  label {
    cursor: pointer;
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 1px solid #bebebe;
    border-radius: 3px;
  }
}
</style>
