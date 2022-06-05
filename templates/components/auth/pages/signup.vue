<template>
  <TtemplateSignup v-model="value" @submit="signup"></TtemplateSignup>
</template>

<script lang="ts">
import Vue from 'vue'
import TtemplateSignup from '@/components/templates/Signup'
import { IAccountProps } from '@/entities/Account'
import SignupUseCase from '@/usecases/auth/SignupUseCase'

interface IData {
  value: IAccountProps | undefined
}

export default Vue.extend({
  components: {
    TtemplateSignup
  },
  layout: 'auth',
  data(): IData {
    return {
      value: undefined
    }
  },
  methods: {
    async signup() {
      try {
        this.App.admin.loading = true
        if (await new SignupUseCase(this.App).execute(this.value!)) {
          this.$router.push('/home')
        }
      } catch (e: any) {
        this.$nuxt.error(e)
      } finally {
        this.App.admin.loading = false
      }
    }
  }
})
</script>
