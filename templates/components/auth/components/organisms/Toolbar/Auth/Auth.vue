<template>
  <v-app-bar app color="white" elevate-on-scroll>
    <v-container fluid>
      <v-row>
        <v-col align-self="center" class="logo-lg">
          <Logo></Logo>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '@/components/molecules/Logo'

export default Vue.extend({
  components: {
    Logo
  }
})
</script>
