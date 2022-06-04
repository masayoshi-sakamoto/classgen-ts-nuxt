<template>
  <nuxt />
</template>

<script lang="ts">
import Vue from 'vue'
import authenticated from '@/middleware/authenticated'

export default Vue.extend({
  middleware: [authenticated]
})
</script>
