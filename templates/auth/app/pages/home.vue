<template>
  <LayoutAdmin>
    <v-container>ホーム</v-container>
  </LayoutAdmin>
</template>

<script lang="ts">
import Vue from 'vue'
import authenticated from '@/middleware/authenticated'
import LayoutAdmin from '@/components/organisms/Layout/Admin'

export default Vue.extend({
  components: {
    LayoutAdmin
  },
  middleware: [authenticated]
})
</script>
