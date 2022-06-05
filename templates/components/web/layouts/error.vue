<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col align-self="center" class="text-center">
        <div class="logo lg mb-6">{{ error.statusCode }}</div>
        <div class="text-body-1 mb-4">
          {{ error.statusCode === 404 ? pageNotFound : otherError }}
        </div>
        <v-sheet
          v-if="error.statusCode !== 404"
          width="100%"
          max-width="400"
          class="pa-4 mx-auto"
          color="grey lighten-4"
          rounded="lg"
        >
          <v-layout fill-height justify-center align-center class="grey--text">
            {{ error.raw.message }}
          </v-layout>
        </v-sheet>
        <div class="mt-10">
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
  }
})
</script>
