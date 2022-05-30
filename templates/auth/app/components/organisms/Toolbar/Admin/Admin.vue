<template>
  <v-app-bar app color="white" elevate-on-scroll>
    <v-spacer></v-spacer>
    <Avatar></Avatar>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { menus } from '@/entities/Menu'
import Avatar from '@/components/molecules/Avatar'

export default Vue.extend({
  components: {
    Avatar
  },
  data() {
    return {
      menus
    }
  }
})
</script>
