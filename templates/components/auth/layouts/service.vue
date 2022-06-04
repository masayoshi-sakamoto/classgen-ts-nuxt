<template>
  <LayputApp>
    <nuxt />
  </LayputApp>
</template>

<script lang="ts">
import Vue from 'vue'
import LayputApp from '@/components/organisms/Layout/App'

export default Vue.extend({
  components: {
    LayputApp
  }
})
</script>
