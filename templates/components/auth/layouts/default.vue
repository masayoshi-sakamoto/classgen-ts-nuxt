<template>
  <LayputAdmin>
    <nuxt />
  </LayputAdmin>
</template>

<script lang="ts">
import Vue from 'vue'
import authenticated from '@/middleware/authenticated'
import LayputAdmin from '@/components/organisms/Layout/Admin'

export default Vue.extend({
  components: {
    LayputAdmin
  },
  middleware: [authenticated]
})
</script>
