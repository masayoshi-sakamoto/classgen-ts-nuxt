<template>
  <v-dialog v-model="dialog" max-width="100%" width="640">
    <template #activator="{ on }">
      <a-btn color="error" v-on="on">{{ title }}</a-btn>
    </template>
    <v-card>
      <div class="px-5 pt-6 pb-3 text-body-1">
        <slot>削除してよろしいでしょうか？</slot>
      </div>
      <v-card-actions class="justify-end">
        <a-btn cancel @click="dialog = !dialog">キャンセル</a-btn>
        <a-btn
          color="error"
          @click="
            $emit('execute')
            dialog = !dialog
          "
          >{{ title }}</a-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
  dialog: boolean
}

const component = Vue.extend({
  props: {
    title: {
      type: String,
      default: '削除する'
    }
  },
  data(): IData {
    return {
      dialog: false
    }
  }
})
Vue.component('ADelete', component)
export default component
</script>
