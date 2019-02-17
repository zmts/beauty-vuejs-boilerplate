<template>
  <transition name="modal">
    <div class="ui-modal overlay component" v-if="show" @click="onClickOverlay" ref="overlay">
      <div class="modal-content">
        <div class="header">
          <span class="close" @click="close" v-if="showCloseButton">close</span>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'UiModal',

  props: {
    show: {
      type: Boolean,
      default: false
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    closeOnOverlay: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    close () {
      this.$emit('update:show', false)
    },
    onClickOverlay ($event) {
      if (this.closeOnOverlay && $event && $event.target === this.$refs.overlay) {
        this.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-modal.overlay.component {
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-content {
    min-width: 200px;
    background-color: red;
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.5);
    .header {
      display: flex;
      justify-content: flex-end;
      .close {
        border: 1px solid black;
        padding: 2px;
        cursor: pointer;
      }
    }
  }
}

/* modal transition */
.modal-enter-active, .modal-leave-active {
  transition: all .3s ease;
}
.modal-enter, .modal-leave-to {
  padding-top: 100px;
  opacity: 0;
}
</style>
