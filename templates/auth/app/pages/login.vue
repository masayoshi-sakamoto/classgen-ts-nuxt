<template>
  <LayoutAuth>
    <v-container>
      <v-row justify="center">
        <v-card width="100%" max-width="380" flat>
          <v-card-title class="justify-center text-h4 font-weight-bold mb-5">ログイン</v-card-title>
          <v-card-text>
            <FormLogin v-model="value" @submit="save"></FormLogin>
            <div class="mt-5 text-center text-caption">
              <nuxt-link to="/forget" class="grey--text">パスワードを忘れた方</nuxt-link>
            </div>
            <div class="mt-8 text-center text-body-1">
              <v-btn rounded depressed color="primary" to="/signup">登録はこちら</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </LayoutAuth>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutAuth from '@/components/organisms/Layout/Auth'
import FormLogin from '@/components/organisms/Form/Login'
import AccountEntity, { EmptyAccountEntityFactory } from '@/entities/Account'
import LoginUseCase from '@/usecases/auth/LoginUseCase'

interface IData {
  value: AccountEntity
}

export default Vue.extend({
  components: {
    LayoutAuth,
    FormLogin
  },
  data(): IData {
    return {
      value: EmptyAccountEntityFactory()
    }
  },
  methods: {
    async save() {
      if (await new LoginUseCase(this.App).execute(this.value)) {
        this.$router.push('/home')
      }
    }
  }
})
</script>
