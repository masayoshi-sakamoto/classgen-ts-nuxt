<template>
  <validation-provider v-slot="{ errors }" :name="$attrs.label" :rules="rules">
    <v-select
      :value="value"
      :items="items"
      :error-messages="field ? App.data.errors[field] || errors : errors"
      hide-details="auto"
      v-bind="__attrs"
      background-color="white"
      @input="$emit('input', $event)"
      v-on="$listeners"
    >
    </v-select>
  </validation-provider>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ValidationProvider } from 'vee-validate'

interface IData {
  default: any
  attrs: any
}

const component = Vue.extend({
  components: {
    ValidationProvider
  },
  props: {
    value: {
      type: [String, Number, Object, Array],
      default: null
    },
    items: {
      type: Array as PropType<any[]>,
      default: null
    },
    field: {
      type: String,
      default: null
    },
    rules: {
      type: [String, Array],
      default: ''
    }
  },
  data(): IData {
    return {
      default: {
        outlined: true
      },
      attrs: {
        dialog: {
          outlined: false
        }
      }
    }
  },
  computed: {
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
Vue.component('ASelect', component)
export default component
</script>
