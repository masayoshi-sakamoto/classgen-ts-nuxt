<template>
  <v-overlay :value="App.state.loading" z-index="1000">
    <v-progress-circular color="white" indeterminate size="48"></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
