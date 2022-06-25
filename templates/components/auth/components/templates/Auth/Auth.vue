<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card width="100%" max-width="380" flat>
        <v-card-title v-if="title" class="justify-center text-h4 font-weight-bold">{{ title }}</v-card-title>
        <v-card-text>
          <div v-if="$scopedSlots.subtitle" class="secondary--text text-body-1 mb-4">
            <slot name="subtitle"></slot>
          </div>
          <a-form id="form" v-slot="{ invalid }" @submit="$emit('submit', $event)">
            <slot></slot>
            <a-btn class="mt-6" submit :disabled="invalid">{{ button }}</a-btn>
          </a-form>
          <slot name="extension"></slot>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},
  props: {
    title: {
      type: String,
      default: undefined
    },
    button: {
      type: String,
      default: '実行する'
    }
  }
})
</script>
