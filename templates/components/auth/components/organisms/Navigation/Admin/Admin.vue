<template>
  <v-navigation-drawer v-if="App.state.current && App.state.current.first" permanent app width="312">
    <v-row class="fill-height" no-gutters>
      <Nav mini-variant></Nav>
      <v-list dense flat expand class="grow">
        <a-nav-title></a-nav-title>
        <v-divider class="mb-5"></v-divider>
        <template v-for="group in App.state.current.children">
          <a-nav-group v-if="group.children" :key="group.id" :value="group"></a-nav-group>
          <a-nav-item v-else :key="group.id" :value="group"></a-nav-item>
        </template>
      </v-list>
    </v-row>
  </v-navigation-drawer>
  <Nav v-else app></Nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from './Nav.vue'
import MenuEntity from '@/entities/Menu'

export default Vue.extend({
  components: {
    Nav
  },
  methods: {
    change(value: MenuEntity) {
      value.props.callback(value)
    }
  }
})
</script>
