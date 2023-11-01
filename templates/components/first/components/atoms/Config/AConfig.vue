<template>
  <v-row>
    <v-col v-if="!hideTitle" cols="12" :md="row ? 12 : 6" align-self="center">
      <div class="text-h6">{{ title }}</div>
      <div v-if="$scopedSlots.subtitle" class="text-body-2 secondary--text">
        <slot name="subtitle"></slot>
      </div>
    </v-col>
    <v-col cols="12" :md="row ? 12 : 6" align-self="center">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
const component = Vue.extend({
  props: {
    title: {
      type: String,
      default: 'タイトルを入れてください'
    },
    row: {
      type: Boolean,
      default: false
    },
    hideTitle: {
      type: Boolean,
      default: false
    }
  }
})
Vue.component('AConfig', component)
export default component
</script>
