<template>
  <LayoutApp>
    <v-container fluid>
      <div class="text-center">
        <div class="logo-lg mb-4">{{ error.statusCode }}</div>
        <div class="text-body-1">{{ error.statusCode === 404 ? pageNotFound : otherError }}</div>
        <div class="mt-10">
          <nuxt-link to="/">トップページに戻る</nuxt-link>
        </div>
      </div>
    </v-container>
  </LayoutApp>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutApp from '@/components/organisms/Layout/App'

export default Vue.extend({
  components: {
    LayoutApp
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
