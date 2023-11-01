<template>
  <tr
    :class="{ selected }"
    @dragover="dragover(true)"
    @dragleave="dragover(false)"
    @drop.prevent="drop"
    @click="$emit('click')"
  >
    <slot></slot>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
  selected: boolean
  name: string | null
  show: boolean
}

export default Vue.extend({
  components: {},
  props: {
    value: {
      type: Object,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data(): IData {
    return {
      name: null,
      selected: false,
      show: false
    }
  },
  watch: {
    value: {
      handler() {},
      deep: true,
      immediate: true
    }
  },
  methods: {
    dragover(value: boolean) {
      this.$nextTick(() => {
        if (this.value.isDirectory) {
          this.selected = value
        }
      })
    },
    drop() {
      if (this.selected) {
        this.dragover(false)
        this.$emit('mv', this.value)
      }
    }
  }
})
</script>

<style lang="scss">
.selected {
  background-color: var(--v-primary-base);
}
</style>
