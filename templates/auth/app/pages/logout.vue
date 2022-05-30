<template>
  <v-app>
    <Loading></Loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/molecules/Loading'
import LogoutUseCase from '@/usecases/auth/LogoutUseCase'

export default Vue.extend({
  components: {
    Loading
  },
  async fetch() {
    this.App.state.loading = true
    if (await new LogoutUseCase(this.App).execute()) {
      this.App.auth.logout()
    }
    this.App.state.loading = false
    this.$router.push('/')
  }
})
</script>
