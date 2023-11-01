<template>
  <v-overlay :value="value" z-index="1000" color="white" :opacity="opacity" :absolute="absolute">
    <v-progress-circular color="primary" indeterminate width="3" size="38"></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import Vue from 'vue'
const component = Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: [String, Number],
      default: undefined
    },
    absolute: {
      type: Boolean,
      default: false
    }
  }
})
Vue.component('ALoading', component)
export default component
</script>
