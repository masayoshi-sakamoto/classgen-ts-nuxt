<template>
  <v-container fluid>
    <v-row id="error">
      <v-col class="text-center">
        <div class="logo status mb-10">{{ error.statusCode }}</div>
        <div class="body">
          {{ error.statusCode === 404 ? pageNotFound : error.message }}
        </div>
        <div v-if="error.statusCode === 404" class="mt-10">
          <nuxt-link to="/">トップページに戻る</nuxt-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: 'お探しのページは見つかりません',
      otherError: '不具合が発生しました'
    }
  },
  watch: {
    error: {
      handler() {
        if (this.error.statusCode === 401) {
          this.$router.push('/login')
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.App.state.toolbar = false
  }
})
</script>

<style lang="scss" scoped>
#error {
  margin-top: 100px;
  .status {
    font-size: 4rem !important;
  }
  .body {
    font-size: 1.6rem;
  }
}
</style>
