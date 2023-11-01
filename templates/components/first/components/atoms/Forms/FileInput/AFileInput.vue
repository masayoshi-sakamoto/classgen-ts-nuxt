<template>
  <v-row>
    <v-col :cols="__file() ? 9 : 12">
      <validation-provider v-slot="{ errors }" :vid="vid" :name="$attrs.label" :rules="rules">
        <v-file-input
          v-model="props.file"
          :error-messages="field ? App.data.errors[field] || errors : errors"
          hide-details="auto"
          v-bind="__attrs"
          background-color="white"
          v-on="__listeners"
          @change="
            props.is_delete = true
            $emit('input', props)
          "
        ></v-file-input>
      </validation-provider>
      <v-layout v-if="props.is_delete" class="text-body-1 mt-3" align-center justify-center>
        現在アップロードされているファイルは削除されます。
        <a-btn
          small
          @click="
            props.is_delete = false
            props.file = null
            $emit('input', props)
          "
          >キャンセルする</a-btn
        >
      </v-layout>
    </v-col>
    <v-col v-if="__file()" cols="3">
      <v-card outlined>
        <v-img :src="__file()">
          <v-toolbar flat color="transparent">
            <v-spacer></v-spacer>
            <v-btn
              color="rgba(255, 255, 255, 0.4)"
              x-small
              fab
              @click.stop="
                props.is_delete = true
                $emit('input', props)
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ValidationProvider } from 'vee-validate'

interface IData {
  props: any
  show: boolean
  default: any
  listeners: any
  attrs: any
}

interface IFile {
  file: File
  id_delete: boolean
}

const component = Vue.extend({
  components: {
    ValidationProvider
  },
  props: {
    value: {
      type: Object as PropType<IFile>,
      default: null
    },
    file: {
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
    image: {
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
      props: null,
      show: false,
      default: {
        outlined: true
      },
      listeners: {},
      attrs: {}
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
  watch: {
    value: {
      handler() {
        this.props = this.value
      },
      immediate: true
    }
  },
  methods: {
    __file(): string | null {
      return this.props.is_delete ? null : this.image ? this.file : '/assets/img/no-image.svg'
    }
  }
})
Vue.component('AFileInput', component)
export default component
</script>
