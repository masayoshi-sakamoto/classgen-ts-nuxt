<template>
  <v-app>
    <ToolbarAuth></ToolbarAuth>
    <v-main>
      <slot></slot>
    </v-main>
    <Loading></Loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/molecules/Loading'
import ToolbarAuth from '@/components/organisms/Toolbar/Auth'

export default Vue.extend({
  components: {
    Loading,
    ToolbarAuth
  }
})
</script>
