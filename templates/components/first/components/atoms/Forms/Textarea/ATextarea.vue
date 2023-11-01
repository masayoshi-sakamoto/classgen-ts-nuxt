<template>
  <validation-provider v-slot="{ errors }" :name="$attrs.label" :rules="rules">
    <v-textarea
      v-bind="__attrs"
      ref="textarea"
      auto-grow
      :value="value"
      :error-messages="field ? App.data.errors[field] || errors : errors"
      hide-details="auto"
      :class="{ code }"
      @input="$emit('input', $event)"
      v-on="__listeners"
      @keydown="keydown"
    ></v-textarea>
  </validation-provider>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
  default: any
  attrs: any
  listeners: any
}

const component = Vue.extend({
  props: {
    value: {
      type: String,
      default: null
    },
    field: {
      type: String,
      default: null
    },
    rules: {
      type: [String, Array],
      default: ''
    },
    code: {
      type: Boolean,
      default: false
    }
  },
  data(): IData {
    return {
      default: {
        outlined: true
      },
      listeners: {
        translate: {
          'click:append-outer': () => {
            this.$emit('translate')
          }
        }
      },
      attrs: {
        dialog: {
          outlined: false
        },
        translate: {
          outlined: true,
          appendOuterIcon: 'far fa-lightbulb-exclamation'
        }
      }
    }
  },
  computed: {
    __listeners(): any {
      const index = Object.entries(this.$listeners).find(([key, value]) =>
        value ? Object.keys(this.listeners).includes(key) : false
      )
      const listeners = index ? this.listeners[index[0]] : undefined
      return {
        ...listeners,
        ...this.$listeners
      }
    },
    __attrs(): any {
      const index = Object.entries(this.$attrs).find(([key, value]) =>
        value === '' ? Object.keys(this.attrs).includes(key) : false
      )
      const attrs = index ? this.attrs[index[0]] : this.default
      return {
        ...attrs,
        ...this.$attrs
      }
    }
  },
  methods: {
    keydown(e: any) {
      if (!this.code) {
        return
      }

      // tabを入力できるように修正
      if (e.keyCode !== 9) {
        return
      }
      e.preventDefault()

      const refs: any = this.$refs
      const obj = refs ? refs.textarea.$el.querySelector('textarea') : null

      if (obj) {
        // 現在のカーソルの位置と、カーソルの左右の文字列を取得しておく
        const cursorPosition = obj.selectionStart
        const cursorLeft = obj.value.substr(0, cursorPosition)
        const cursorRight = obj.value.substr(cursorPosition, obj.value.length)

        // テキストエリアの中身を「取得しておいたカーソルの左側」+「タブ」+「取得しておいたカーソルの右側」という状態にする。
        obj.value = cursorLeft + '\t' + cursorRight

        // カーソルの位置を入力したタブの後ろにする
        obj.selectionEnd = cursorPosition + 1
      }
    }
  }
})
Vue.component('ATextarea', component)
export default component
</script>

<style lang="scss" scoped>
.max-height::v-deep textarea {
  max-height: 600px;
}
.code::v-deep textarea {
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
}
</style>
