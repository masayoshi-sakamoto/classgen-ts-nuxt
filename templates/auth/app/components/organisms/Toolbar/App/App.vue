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
        <v-col cols="3" align-self="center" class="text-right">
          <v-btn text to="/home">ログイン</v-btn>
          <v-btn rounded depressed min-width="100" color="primary" to="/signup">登録</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { menus } from '@/entities/Menu'
import Logo from '@/components/molecules/Logo'

export default Vue.extend({
  components: {
    Logo
  },
  data() {
    return {
      menus
    }
  }
})
</script>
