<template>
  <validation-observer v-if="!disabled" ref="observer" v-slot="{ invalid }" slim>
    <v-form :id="id" v-bind="$attrs" ref="form" class="relative" @submit.prevent="execute">
      <slot v-bind="{ invalid }"></slot>
    </v-form>
  </validation-observer>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { validate } from '@/utils/helper'

const component = Vue.extend({
  props: {
    id: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    reset: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    reset() {
      const refs: any = this.$refs
      if (this.reset && refs.form && refs.observer) {
        refs.observer.reset()
        refs.form.reset()
        this.$emit('update:reset', false)
      }
    }
  },
  methods: {
    async execute() {
      if (await validate(this.$refs, 'observer')) {
        this.$emit('submit')
      }
    }
  }
})
Vue.component('AForm', component)
export default component
</script>
