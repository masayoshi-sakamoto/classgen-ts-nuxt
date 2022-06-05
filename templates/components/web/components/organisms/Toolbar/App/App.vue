<template>
  <v-app-bar app color="white" elevate-on-scroll>
    <v-container fluid>
      <v-row>
        <v-col cols="3" align-self="center">
          <Logo></Logo>
        </v-col>
        <v-col cols="6">
          <v-tabs centered>
            <v-tab v-for="menu in menus" :key="menu.id">{{ menu.title }}</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import sites from '@/assets/menus/site'
import Logo from '@/components/molecules/Logo'
import MenuEntity from '@/entities/Menu'

export default Vue.extend({
  components: {
    Logo
  },
  data() {
    return {
      items: sites
    }
  },
  computed: {
    menus(): MenuEntity[] {
      return this.items.map((prop) => new MenuEntity(prop))
    }
  }
})
</script>
