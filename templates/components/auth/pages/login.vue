<template>
  <TtemplateAuth title="ログイン" button="ログイン" @submit="login">
    <FormLogin v-model="value"></FormLogin>
    <template #extension>
      <div class="mt-5 text-center text-caption">
        <nuxt-link to="/forget" class="grey--text">パスワードを忘れた方</nuxt-link>
      </div>
      <div class="mt-8 text-center text-body-1">
        <v-btn rounded depressed color="primary" to="/signup">登録はこちら</v-btn>
      </div>
    </template>
  </TtemplateAuth>
</template>

<script lang="ts">
import Vue from 'vue'
import TtemplateAuth from '@/components/templates/Auth'
import FormLogin from '@/components/organisms/Form/Auth/Login'
import { IAccountProps } from '@/entities/Account'
import LoginUseCase from '@/usecases/auth/LoginUseCase'

interface IData {
  value: IAccountProps | undefined
}

export default Vue.extend({
  components: {
    TtemplateAuth,
    FormLogin
  },
  layout: 'auth',
  data(): IData {
    return {
      value: undefined
    }
  },
  methods: {
    async login() {
      if (await new LoginUseCase(this.App).execute(this.value!)) {
        return this.$router.push('/home')
      }
      this.App.state.loading = false
    }
  }
})
</script>
