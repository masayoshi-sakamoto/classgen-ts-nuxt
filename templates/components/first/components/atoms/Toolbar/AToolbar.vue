<template>
  <div class="d-none">
    <portal to="toolbar">
      <slot name="toolbar"></slot>
    </portal>
    <portal to="extension">
      <slot name="extension"></slot>
    </portal>
    <portal to="loading">
      <slot name="loading"></slot>
    </portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const component = Vue.extend({
  props: {
    toolbar: {
      type: Boolean,
      default: undefined
    },
    extension: {
      type: Boolean,
      default: undefined
    }
  },
  watch: {
    extensvion: {
      handler() {
        this.App.state.toolbar = this.toolbar === undefined ? !!this.$scopedSlots.toolbar : this.toolbar
      },
      immediate: true
    },
    extension: {
      handler() {
        this.App.state.extension = this.extension === undefined ? !!this.$scopedSlots.extension : this.extension
      },
      immediate: true
    }
  },
  mounted() {
    this.App.state.toolbar = this.toolbar === undefined ? !!this.$scopedSlots.toolbar : this.toolbar
    this.App.state.extension = this.extension === undefined ? !!this.$scopedSlots.extension : this.extension
  }
})
Vue.component('AToolbar', component)
export default component
</script>
