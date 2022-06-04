<template>
  <LayputAuth>
    <nuxt />
  </LayputAuth>
</template>

<script lang="ts">
import Vue from 'vue'
import LayputAuth from '@/components/organisms/Layout/Auth'

export default Vue.extend({
  components: {
    LayputAuth
  }
})
</script>
