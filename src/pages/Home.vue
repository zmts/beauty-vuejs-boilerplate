<template>
  <div class="home page">
    <h1>{{ msg }}</h1>
    <button @click="isShownModal = true">show modal</button>
    <button @click="showToast">show toast</button>
    <UiModal closeOnOverlay :show.sync="isShownModal">
      <div>
        hi here
      </div>
    </UiModal>
  </div>
</template>

<script>
  import UiModal from '@/components/UiModal.vue'
  export default {
    name: 'IndexPage',
    components: {
      UiModal
    },
    data () {
      return {
        msg: 'Welcome to Index!!!',
        isShownModal: false
      }
    },

    methods: {
      showToast () {
        this.$store.commit('dom/TOAST', {type: 'success', message: 'hello'})
      }
    }
  }
</script>
