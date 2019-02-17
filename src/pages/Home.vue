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

    <UiBaseIcon width="40px" height="40px" color="blue" iconName="done" @click="onClickIcon"/>

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
        <UiBaseIcon iconName="done"/>
      </div>
      <div slot="after">
        <UiBaseIcon iconName="write"/>
      </div>
      <div slot="bottom">This is very important description</div>
    </UiInputText>

    <UiCheckbox value="hello checkbox" v-model="checkboxState"/>

    <br><br>
    <UiPaginationOffset :offset.sync="pagination.offset" :limit="pagination.limit" :total="pagination.total"/>

  </div>
</template>

<script>
import UiModal from '@/components/UiModal.vue'
import UiBaseIcon from '@/components/icons/UiBaseIcon.vue'
import UiInputText from '@/components/UiInputText.vue'
import UiCheckbox from '@/components/UiCheckbox.vue'
import UiPaginationOffset from '../components/UiPaginationOffset'

export default {
  name: 'IndexPage',

  components: {
    UiModal,
    UiBaseIcon,
    UiInputText,
    UiCheckbox,
    UiPaginationOffset
  },

  data () {
    return {
      msg: 'Welcome to Index!!!',
      isShownModal: false,
      inputError: false,
      checkboxState: false,

      pagination: {
        limit: 20,
        offset: 0,
        total: 60
      }
    }
  },

  methods: {
    showToast () {
      console.log('aaa')
      this.$store.commit('toast/NEW', { type: 'success', message: 'hello' })
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
    },
    onClickIcon () {
      console.log('onClickIcon!!!!')
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
