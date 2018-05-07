<template>
  <div class="home page">
    <h1>{{ msg }}</h1>
    <button @click="isShownModal = true">show modal</button>
    <button class="show-toast" @click="showToast">show toast</button>
    <ModalWindow
      closeOnOverlay
      @close="onCloseModal"
      :show="isShownModal">
      <div>
        hi here
      </div>
    </ModalWindow>
  </div>
</template>

<script>
  import ModalWindow from '@/components/ModalWindow.vue'
  export default {
    name: 'IndexPage',
    components: {
      ModalWindow
    },
    data () {
      return {
        msg: 'Welcome to Index!!!',
        isShownModal: false
      }
    },

    methods: {
      onCloseModal () {
        this.isShownModal = false
      },
      showToast () {
        this.$store.commit('dom/TOAST', {type: 'success', message: 'lol'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .show-toast{
    position: absolute;
    right: 10px;
  }
</style>
