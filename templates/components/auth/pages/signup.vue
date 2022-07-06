<template>
  <TtemplateAuth title="会員登録" button="同意して登録する" @submit="signup">
    <FormSignup v-model="value"></FormSignup>
    <template #extension>
      <div class="mt-5 text-caption">
        会員登録には、<nuxt-link to="/term" class="grey--text">利用規約</nuxt-link>と<nuxt-link
          to="/policy"
          class="grey--text"
          >プライバシーポリシー</nuxt-link
        >への同意が必要です。
      </div>
      <v-divider class="mt-8"></v-divider>
      <div class="mt-8 text-center text-body-1">
        <nuxt-link to="/login">ログインはこちら</nuxt-link>
      </div>
    </template>
  </TtemplateAuth>
</template>

<script lang="ts">
import Vue from 'vue'
import TtemplateAuth from '@/components/templates/Auth'
import FormSignup from '@/components/organisms/Form/Auth/Signup'
import { IAccountProps } from '@/entities/Account'
import SignupUseCase from '@/usecases/auth/SignupUseCase'

interface IData {
  value: IAccountProps | undefined
}

export default Vue.extend({
  components: {
    TtemplateAuth,
    FormSignup
  },
  layout: 'auth',
  data(): IData {
    return {
      value: undefined
    }
  },
  methods: {
    async signup() {
      if (await new SignupUseCase(this.App).execute(this.value!)) {
        this.$router.push('/home')
      }
    }
  }
})
</script>
