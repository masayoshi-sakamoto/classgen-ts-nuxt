<template>
  <v-dialog
    v-model="__value"
    width="100%"
    :max-width="xLarge ? '90%' : large ? 860 : 640"
    scrollable
    overlay-color="accent"
    :persistent="loading !== null ? loading : submit"
  >
    <template #activator="{ on }">
      <slot name="activator" v-bind="{ on }"></slot>
    </template>
    <validation-observer ref="observer" v-slot="{ passes, invalid }" slim>
      <v-form ref="form" @submit.prevent="passes(execute)">
        <v-card flat>
          <v-card-title v-if="title" class="text-h5 mb-2">{{ title }}</v-card-title>
          <v-card-subtitle v-if="subtitle" class="secondary--text">{{ subtitle }}</v-card-subtitle>
          <v-card-text ref="scrollable">
            <slot></slot>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-5">
            <v-spacer></v-spacer>
            <a-btn cancel class="px-5" @click="__value = false">{{ cancel }}</a-btn>
            <a-btn class="px-6" type="submit" :disabled="invalid">{{ ok }}</a-btn>
          </v-card-actions>
          <a-loading :value="loading !== null ? loading : submit" absolute></a-loading>
        </v-card>
      </v-form>
    </validation-observer>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
  submit: boolean
  dialog: boolean
}

const component = Vue.extend({
  components: {},
  props: {
    value: {
      type: Boolean,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    cancel: {
      type: String,
      default: 'キャンセル'
    },
    ok: {
      type: String,
      default: '保存する'
    },
    large: {
      type: Boolean,
      default: false
    },
    xLarge: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: null
    }
  },
  data(): IData {
    return {
      submit: false,
      dialog: this.value
    }
  },
  computed: {
    __value: {
      get(): boolean {
        return this.dialog
      },
      set(value: boolean) {
        this.dialog = value
        this.$emit('input', value)
      }
    }
  },
  watch: {
    value() {
      const refs: any = this.$refs
      if (refs.form && refs.observer) {
        refs.form.reset()
        refs.observer.reset()
        refs.scrollable.scrollTop = 0
      }
      this.dialog = this.value
      this.submit = false
    }
  },
  methods: {
    execute() {
      this.submit = true
      this.$emit('submit')
    },
    click() {}
  }
})
Vue.component('ADialog', component)
export default component
</script>
