<template>
  <div class="wrap" :style="{ width: __width }">
    <v-text-field
      v-model="word"
      prepend-icon="mdi-magnify"
      hide-details
      outlined
      rounded
      dense
      clearable
      background-color="white"
      @click:clear="$emit('input', null)"
      @input="change"
      @focus="width = 'long'"
      @blur="width = 'short'"
      @compositionstart="composing = true"
      @compositionend="
        composing = false
        change()
      "
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
  word: string | null
  composing: boolean
  width: string
  timer: any
}

const component = Vue.extend({
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data(): IData {
    return {
      word: this.value,
      composing: false,
      width: 'short',
      timer: null
    }
  },
  computed: {
    __width(): string {
      return this.$vuetify.breakpoint.smAndDown
        ? this.width === 'short'
          ? '150px'
          : '150px'
        : this.width === 'short'
        ? '250px'
        : '500px'
    }
  },
  methods: {
    change() {
      if (!this.composing) {
        clearTimeout(this.timer)
        this.timer = setTimeout(this.search, 500)
      }
    },
    search() {
      this.$emit('input', this.word)
    }
  }
})
Vue.component('ASearch', component)
export default component
</script>

<style lang="scss" scoped>
.wrap {
  max-width: 100%;
  transition: all 0.2s 0s ease;
}
.v-input--dense {
  &.v-input {
    font-size: 14px !important;
  }
}
::v-deep {
  .v-input__prepend-outer {
    margin-right: 6px;
  }
  .v-input__slot {
    padding: 0 10px 0 14px !important;
    min-height: 32px !important;
  }
  .v-input__icon {
    height: 20px;
    width: 20px;
    min-width: 20px;
    .v-icon.v-icon {
      font-size: 20px;
    }
  }
}
</style>
