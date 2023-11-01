<template>
  <validation-provider v-slot="{ errors }" :vid="vid" :name="$attrs.label" :rules="rules">
    <v-text-field
      :value="value"
      :append-icon="password ? (show ? 'mdi-eye' : 'mdi-eye-off') : undefined"
      :type="password ? (show ? 'text' : 'password') : undefined"
      :error-messages="field ? App.data.errors[field] || errors : errors"
      hide-details="auto"
      v-bind="__attrs"
      background-color="white"
      @click:append="show = !show"
      @input="$emit('input', $event)"
      v-on="__listeners"
    ></v-text-field>
  </validation-provider>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider } from 'vee-validate'

interface IData {
  show: boolean
  default: any
  listeners: any
  attrs: any
}

const component = Vue.extend({
  components: {
    ValidationProvider
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    field: {
      type: String,
      default: null
    },
    rules: {
      type: [String, Array, Object],
      default: ''
    },
    password: {
      type: Boolean,
      default: false
    },
    vid: {
      type: String,
      default: undefined
    }
  },
  data(): IData {
    return {
      show: false,
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
  }
})
Vue.component('ATextField', component)
export default component
</script>
