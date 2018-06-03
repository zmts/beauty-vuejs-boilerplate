<template>
  <div class="ui-input-text component">
    <div class="slot-before" v-if="this.$slots.before">
      <slot name="before"></slot>
    </div>

    <div class="input-wrapper">
      <label
        :class="{ 'is-label-error': error }"
        :for="labelId">{{ label }}
      </label>

      <input
        :id="labelId"
        :type="inputType"
        :style="inputStyle"
        :class="{ 'is-input-error': error }"
        :value="value"
        :placeholder="placeholder"
        v-on="listeners">

      <div class="slot-bottom" v-if="this.$slots.bottom">
        <slot name="bottom"/>
      </div>
    </div>

    <div class="slot-after" v-if="this.$slots.after">
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UiInputText',

    props: {
      label: { type: String },
      height: { type: String, default: '44px' },
      password: { type: Boolean, default: false },
      value: { required: true },
      placeholder: { type: String },
      error: {
        type: [String, Boolean],
        default: false
      }
    },

    methods: {
      getRandomInt () {
        let min = 1
        let max = 1000000000
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    },

    computed: {
      inputStyle () {
        return `height: ${this.height};`
      },
      labelId () {
        return `inputId${this.getRandomInt()}`
      },
      inputType () {
        return this.password ? 'password' : 'text'
      },
      listeners () {
        return {
          ...this.$listeners,
          input: event => this.$emit('input', event.target.value)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color-gray: #b3b3b3;

  .ui-input-text.component {
    display: flex;
    align-items: center;
    .input-wrapper {
      width: 100%;
    }
    .slot-bottom {
      padding-top: 5px;
      font-size: 13px;
      color: $color-gray;
    }
    label {
      cursor: pointer;
      display: block;
      color: $color-gray;
      font-size: 13px;
      padding-bottom: 5px;
    }
    input {
      width: 100%;
      background-color: transparent;
      border-radius: 6px;
      border: 1px solid $color-gray;
      font-size: 17px;
      padding: 15px 12px;
      outline: none;
      &:focus {
        border: 1px solid #1e2221;
      }
    }
    .is-input-error {
      border: 1px solid red;
    }
    .is-label-error {
      color: red;
    }
  }
</style>

