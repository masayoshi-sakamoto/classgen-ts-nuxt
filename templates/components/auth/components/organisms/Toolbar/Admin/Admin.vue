<template>
  <v-app-bar
    v-if="$scopedSlots.toolbar"
    app
    color="white"
    flat
    dense
    elevate-on-scroll
    :extension-height="extensionHeight"
  >
    <slot name="toolbar"></slot>
    <template v-if="$scopedSlots.extension" #extension>
      <slot name="extension"></slot>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},
  props: {
    title: {
      type: String,
      default: null
    },
    extensionHeight: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.v-app-bar {
  border-bottom: 1px var(--v-grey-lighten2) solid !important;
}
</style>
