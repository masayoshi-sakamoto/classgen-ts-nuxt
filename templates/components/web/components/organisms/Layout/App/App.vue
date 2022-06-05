<template>
  <v-app>
    <ToolbarApp></ToolbarApp>
    <v-main>
      <slot></slot>
    </v-main>
    <a-loading></a-loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import ToolbarApp from '@/components/organisms/Toolbar/App'

export default Vue.extend({
  components: {
    ToolbarApp
  }
})
</script>
