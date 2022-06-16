<template>
  <v-app>
    <a-loading :value="App.state.loading"></a-loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import LogoutUseCase from '@/usecases/auth/LogoutUseCase'

export default Vue.extend({
  layout: 'auth',
  async fetch({ App, redirect }) {
    App.state.loading = true
    await new LogoutUseCase(App).execute()
    App.auth.logout()
    App.state.loading = false
    redirect('/')
  }
})
</script>
