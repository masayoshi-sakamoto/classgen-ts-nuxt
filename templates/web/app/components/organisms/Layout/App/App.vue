<template>
  <v-app>
    <ToolbarApp></ToolbarApp>
    <v-main>
      <slot></slot>
    </v-main>
    <Loading></Loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/molecules/Loading'
import ToolbarApp from '@/components/organisms/Toolbar/App'

export default Vue.extend({
  components: {
    Loading,
    ToolbarApp
  }
})
</script>
