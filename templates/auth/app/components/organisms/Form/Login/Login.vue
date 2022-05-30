<template>
  <validation-observer ref="observer" v-slot="{ passes, invalid }">
    <v-form @submit.prevent="passes(submit)">
      <validation-provider v-slot="{ errors }" name="メールアドレス/ユーザーID" rules="required">
        <v-text-field v-model="props.username" label="メールアドレス/ユーザーID" outlined :error-messages="App.state.errors.username || errors"></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="パスワード" rules="required">
        <v-text-field
          v-model="props.password"
          label="パスワード"
          outlined
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :error-messages="App.state.errors.password || errors"
          @click:append="show = !show"
        ></v-text-field>
      </validation-provider>
      <v-btn block depressed x-large type="submit" :disabled="invalid" color="primary">ログイン</v-btn>
    </v-form>
  </validation-observer>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import AccountEntity, { EmptyAccountPropsFactory, IAccountProps } from '@/entities/Account'

interface IData {
  show: boolean
  props: IAccountProps
}

export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<AccountEntity>,
      required: true
    }
  },
  data(): IData {
    return {
      show: false,
      props: EmptyAccountPropsFactory()
    }
  },
  watch: {
    value: {
      handler() {
        this.cancel()
        this.props = this.value.clone.props
      },
      immediate: true
    }
  },
  methods: {
    submit() {
      this.$emit('input', new AccountEntity(this.props))
      this.$emit('submit')
    },
    cancel() {
      const refs: any = this.$refs
      if (refs.observer) {
        refs.observer.reset()
      }
      this.App.state.errors = []
    }
  }
})
</script>
