<template>
  <v-app>
    <ToolbarAuth></ToolbarAuth>
    <v-main>
      <slot></slot>
    </v-main>
    <a-loading></a-loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import ToolbarAuth from '@/components/organisms/Toolbar/Auth'

export default Vue.extend({
  components: {
    ToolbarAuth
  }
})
</script>
