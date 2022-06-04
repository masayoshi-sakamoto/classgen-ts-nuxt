<template>
  <v-app>
    <v-main :class="color">
      <slot></slot>
    </v-main>
    <a-loading :value="App.state.loading" opacity="100"></a-loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},
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
