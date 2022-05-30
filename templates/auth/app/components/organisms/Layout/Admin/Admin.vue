<template>
  <v-app>
    <v-main :class="color">
      <slot></slot>
    </v-main>
    <Loading :value="App.state.loading" opacity="100"></Loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/molecules/Loading'

export default Vue.extend({
  components: {
    Loading
  },
  props: {
    color: {
      type: String,
      default: 'background'
    },
    extensionHeight: {
      type: [String, Number],
      default: 60
    }
  }
})
</script>
