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

    <UiIconBase size="40" color="blue" icon="done"/>

    <UiInputText
      v-model="msg"
      placeholder="Enter message"
      label="Enter message"
      someHelloProp="hello"
      @blur="onBlur"
      @keyup.enter="onEnter"
      @keyup.esc="onEsc"
      :error="inputError">
      <div slot="before">
        <UiIconBase icon="done"/>
      </div>
      <div slot="after">
        <UiIconBase icon="write"/>
      </div>
      <div slot="bottom">This is very important description</div>
    </UiInputText>

  </div>
</template>

<script>
  import UiModal from '@/components/UiModal.vue'
  import UiIconBase from '@/components/icons/UiIconBase.vue'
  import UiInputText from '@/components/UiInputText.vue'

  export default {
    name: 'IndexPage',

    components: {
      UiModal,
      UiIconBase,
      UiInputText
    },

    data () {
      return {
        msg: 'Welcome to Index!!!',
        isShownModal: false,
        inputError: false
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
      },
      onBlur () {
        console.log('onBlur!!!')
      },
      onEnter () {
        console.log('onEnter!!!')
      },
      onEsc () {
        console.log('onEsc!!!')
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
