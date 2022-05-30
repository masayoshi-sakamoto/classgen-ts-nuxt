<template>
  <LayoutApp>
    <v-container>トップページ</v-container>
  </LayoutApp>
</template>

<script lang="ts">
import Vue from 'vue'
import authenticated from '@/middleware/authenticated'
import LayoutApp from '@/components/organisms/Layout/App'

export default Vue.extend({
  components: {
    LayoutApp
  },
  middleware: [authenticated]
})
</script>
