<template>
  <div class="home page">
    <h1>{{ msg }}</h1>
    <button @click="isShownModal = true">show modal</button>
    <button @click="showToast">show toast</button>
    <UiModal closeOnOverlay :show.sync="isShownModal">
      <div class="some-modal-content">
        hi here
        <div class="buttons">
          <button @click="submitModalHandler">ok</button>
        </div>
      </div>
    </UiModal>

    <UiIconBase size="40" color="red" icon="done"/>

  </div>
</template>

<script>
  import UiModal from '@/components/UiModal.vue'
  import UiIconBase from '@/components/icons/UiIconBase.vue'

  export default {
    name: 'IndexPage',
    components: {
      UiModal,
      UiIconBase
    },
    data () {
      return {
        msg: 'Welcome to Index!!!',
        isShownModal: false
      }
    },

    methods: {
      showToast () {
        console.log('aaa')
        this.$store.commit('toast/NEW', {type: 'success', message: 'hello'})
      },
      submitModalHandler () {
        // some logic
        this.isShownModal = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .some-modal-content {
    min-width: 400px;
    padding: 25px;

    .buttons button {
      padding: 10px;
      margin: 10px;
    }
  }
</style>
