<template>
  <v-app>
    <ToolbarAdmin :extension-height="extensionHeight">
      <template v-if="$scopedSlots.toolbar" #toolbar>
        <slot name="toolbar"></slot>
      </template>
      <template v-if="$scopedSlots.extension" #extension>
        <slot name="extension"></slot>
      </template>
    </ToolbarAdmin>
    <NavigationAdmin></NavigationAdmin>
    <v-main :class="color">
      <slot></slot>
    </v-main>
    <a-loading :value="App.state.loading" opacity="100"></a-loading>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import ToolbarAdmin from '@/components/organisms/Toolbar/Admin'
import NavigationAdmin from '@/components/organisms/Navigation/Admin'

export default Vue.extend({
  components: {
    ToolbarAdmin,
    NavigationAdmin
  },
  props: {
    color: {
      type: String,
      default: 'white'
    },
    extensionHeight: {
      type: [String, Number],
      default: 60
    }
  }
})
</script>
