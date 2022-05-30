<template>
  <v-navigation-drawer v-model="App.state.drawer" app color="accent" dark>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title><Logo></Logo></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list dense nav>
      <v-list-item-group color="primary">
        <v-list-item v-for="item in admins" :key="item.id" :to="item.to" exact>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { admins } from '@/entities/Menu'
import Logo from '@/components/molecules/Logo'

export default Vue.extend({
  components: {
    Logo
  },
  data() {
    return {
      admins
    }
  }
})
</script>
