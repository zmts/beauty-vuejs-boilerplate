<template>
  <div class="ui-input-text component">
    <div class="slot-before" v-if="$slots.before" :style="inputHeight">
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
        :style="inputHeight"
        :class="inputClasses"
        :value="value"
        :placeholder="placeholder"
        v-on="listeners">

      <div class="slot-bottom" v-if="$slots.bottom">
        <slot name="bottom"/>
      </div>
    </div>

    <div class="slot-after" v-if="$slots.after" :style="inputHeight">
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
      const min = 1
      const max = 1000000000
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  },

  computed: {
    inputHeight () {
      return `height: ${this.height};`
    },
    inputClasses () {
      return {
        'is-input-error': this.error,
        'border-radius-start': !this.$slots.before,
        'border-radius-end': !this.$slots.after
      }
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
$radius: 5px;
$padding: 5px;

.ui-input-text.component {
  display: flex;
  align-items: center;
  .input-wrapper {
    width: 100%;
  }
  .slot-bottom {
    padding-top: $padding;
    font-size: 13px;
    color: $color-gray;
  }
  .slot-after, .slot-before {
    color: $color-gray;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
  .slot-before {
    border: 1px solid $color-gray;
    border-right: 0;
    border-top-left-radius: $radius;
    border-bottom-left-radius: $radius;
  }
  .slot-after {
    border: 1px solid $color-gray;
    border-left: 0;
    border-top-right-radius: $radius;
    border-bottom-right-radius: $radius;
  }

  label {
    cursor: pointer;
    display: block;
    color: $color-gray;
    font-size: 13px;
    padding-bottom: $padding;
  }
  input {
    width: 100%;
    background-color: transparent;
    border: 1px solid $color-gray;
    font-size: 17px;
    padding: 15px 12px;
    outline: none;
    &:focus {
      border: 1px solid #1e2221;
    }
    &.border-radius-start {
      border-top-left-radius: $radius;
      border-bottom-left-radius: $radius;
    }
    &.border-radius-end {
      border-top-right-radius: $radius;
      border-bottom-right-radius: $radius;
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
