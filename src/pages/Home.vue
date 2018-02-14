<template>
  <div class="home page">
    <h1>{{msg}}</h1>
    <button @click="isShownModal = true">show modal</button>
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
      }
    }
  }
</script>
