<template>
  <div :class="large ? 'text-h6' : 'text-body-2'">{{ __value }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

const component = Vue.extend({
  props: {
    value: {
      type: String,
      default: undefined
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    __value(): string {
      if (this.value) {
        const words = this.value.split(/\s+/)
        let result = ''
        for (const word of words) {
          const chars = [...word]
          result += chars[0]
        }
        return result
      }
      return this.value
    }
  }
})

Vue.component('AAccount', component)
export default component
</script>
