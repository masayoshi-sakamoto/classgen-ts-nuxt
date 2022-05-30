<template>
  <LayoutAuth>
    <v-container fluid>
      <div class="text-center">
        <div class="logo-lg mb-4">{{ error.statusCode }}</div>
        <div class="text-body-1">{{ error.statusCode === 404 ? pageNotFound : otherError }}</div>
        <div class="mt-10">
          <nuxt-link to="/">トップページに戻る</nuxt-link>
        </div>
      </div>
    </v-container>
  </LayoutAuth>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutAuth from '@/components/organisms/Layout/Auth'

export default Vue.extend({
  components: {
    LayoutAuth
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: 'お探しのページは見つかりません',
      otherError: 'サーバーエラー'
    }
  },
  watch: {
    error: {
      handler() {
        if (this.error.statusCode === 401) {
          this.App.state.clear()
          this.$router.push('/login')
        }
      },
      immediate: true
    }
  }
})
</script>
