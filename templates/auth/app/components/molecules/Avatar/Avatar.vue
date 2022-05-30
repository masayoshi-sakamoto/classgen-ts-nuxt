<template>
  <v-menu offset-y>
    <template #activator="{ on }">
      <v-btn dark icon v-on="on">
        <v-avatar size="40" class="text-body-2" color="grey">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item v-for="menu in menus" :key="menu.id" :to="menu.to">
        <v-list-item-title>{{ menu.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { subs } from '@/entities/Menu'

export default Vue.extend({
  data() {
    return {
      menus: subs
    }
  }
})
</script>
