<template>
  <div :style="{ width: '140px' }">
    <v-select
      :value="value"
      :items="pages"
      filled
      dense
      rounded
      outlined
      hide-details
      background-color="white"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
    >
    </v-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const pages = [
  { text: '10件', value: 10 },
  { text: '20件', value: 20 },
  { text: '40件', value: 40 },
  { text: '80件', value: 80 },
  { text: '120件', value: 120 }
]

const component = Vue.extend({
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      pages
    }
  }
})
Vue.component('AItemsParPage', component)
export default component
</script>

<style lang="scss" scoped>
.v-input--dense {
  &.v-input {
    font-size: 14px !important;
  }
  ::v-deep {
    .v-input__append-inner {
      margin-top: 4px !important;
    }
    .v-input__slot {
      min-height: 32px !important;
    }
  }
}
</style>
