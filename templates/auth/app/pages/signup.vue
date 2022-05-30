<template>
  <LayoutAuth>
    <v-container>
      <v-row justify="center">
        <v-card width="100%" max-width="380" flat>
          <v-card-title class="justify-center text-h4 font-weight-bold mb-5">会員登録</v-card-title>
          <v-card-text>
            <FormSignup v-model="value" @submit="save"></FormSignup>
            <div class="mt-5 text-caption">
              会員登録には、<nuxt-link to="/term" class="grey--text">利用規約</nuxt-link>と<nuxt-link to="/policy" class="grey--text"
                >プライバシーポリシー</nuxt-link
              >への同意が必要です。
            </div>
            <v-divider class="mt-8"></v-divider>
            <div class="mt-8 text-center text-body-1">
              <nuxt-link to="/login">ログインはこちら</nuxt-link>
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
import FormSignup from '@/components/organisms/Form/Signup'
import AccountEntity, { EmptyAccountEntityFactory } from '@/entities/Account'
import SignupUseCase from '@/usecases/auth/SignupUseCase'

interface IData {
  value: AccountEntity
}

export default Vue.extend({
  components: {
    LayoutAuth,
    FormSignup
  },
  data(): IData {
    return {
      value: EmptyAccountEntityFactory()
    }
  },
  methods: {
    async save() {
      if (await new SignupUseCase(this.App).execute(this.value)) {
        this.$router.push('/')
      }
    }
  }
})
</script>
