<template>
  <a-form
    :id="id"
    ref="form"
    v-slot="{ invalid }"
    :disabled="!form"
    :reset="reset"
    @update:reset="$emit('update:reset', $event)"
    @submit="$emit('submit')"
  >
    <v-sheet flat outlined rounded="sm">
      <div v-if="title" class="mt-4 px-6 text-h6">{{ title }}</div>
      <div v-if="$scopedSlots.subtitle" class="text-body-2 secondary--text px-6">
        <slot name="subtitle"></slot>
      </div>
      <div class="pa-6">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    </v-sheet>
    <div v-if="$scopedSlots.outside" class="mt-2 text-right">
      <slot name="outside" v-bind="{ invalid }"></slot>
    </div>
  </a-form>
</template>

<script lang="ts">
import Vue from 'vue'

const component = Vue.extend({
  props: {
    title: {
      type: String,
      default: null
    },
    form: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: undefined
    },
    reset: {
      type: Boolean,
      default: false
    }
  }
})
Vue.component('ASheet', component)
export default component
</script>
