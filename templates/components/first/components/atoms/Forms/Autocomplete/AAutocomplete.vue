<template>
  <validation-provider v-slot="{ errors }" :name="$attrs.label" :rules="rules">
    <v-autocomplete
      :value="value"
      :items="items"
      :search-input="searchInput"
      hide-details="auto"
      no-data-text="一致するデータはありません"
      :error-messages="field ? App.data.errors[field] || errors : errors"
      v-bind="__attrs"
      @input="$emit('input', $event)"
      @update:searchInput="$emit('update:searchInput', $event)"
      v-on="$listeners"
    >
    </v-autocomplete>
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
      type: [String, Number],
      default: null
    },
    items: {
      type: Array as PropType<{ text: any; value: any }[]>,
      default: null
    },
    searchInput: {
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
Vue.component('AAutocomplete', component)
export default component
</script>
