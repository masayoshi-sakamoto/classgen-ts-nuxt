<template>
  <v-container fluid>
    <client-only>
      <a-toolbar>
        <template #toolbar>
          <v-layout align-center class="pointer" @click="back">
            <v-avatar class="mr-2 pointer" size="20" color="secondary lighten-1">
              <v-icon color="white" small>mdi-arrow-left</v-icon>
            </v-avatar>
            <div>{{ App.state.current?.pageTitle }}{{ value.id ? '編集' : '登録' }}</div>
          </v-layout>
          <v-spacer></v-spacer>
          <a-btn dense form="form" type="submit" class="px-6">{{ value.id ? '保存する' : '登録する' }}</a-btn>
        </template>
      </a-toolbar>
    </client-only>
    <slot></slot>
    <a-sheet v-if="value.id && !hideDelete" class="mt-12">
      <a-config :title="`${__name}の削除`">
        <template #subtitle>
          {{ __name }}を削除すると、登録されている情報など、{{ __name }}に関するすべてのデータが削除されます。
        </template>
        <a-dialog ok="削除する" @submit="remove">
          <template #activator="{ on }">
            <div class="text-right">
              <a-btn large max-width="330px" width="100%" color="error" v-on="on">
                <v-layout>
                  <div class="text-overflow">{{ __name }}</div>
                  <div>を削除する</div>
                </v-layout>
              </a-btn>
            </div>
          </template>
          <div class="px-5 py-3 black--text text-body-1">{{ __name }}を削除してよろしいでしょうか？</div>
        </a-dialog>
      </a-config>
    </a-sheet>
    <a-loading :value="App.data.saving" absolute></a-loading>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import VueScrollTo from 'vue-scrollto'

export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<any>,
      default: null
    },
    title: {
      type: String,
      default: 'title'
    },
    name: {
      type: String,
      default: null
    },
    hideDelete: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    __name() {
      return this.name || this.value[this.title]
    }
  },
  mounted() {
    this.scrollTop()
  },
  methods: {
    scrollTop() {
      VueScrollTo.scrollTo(document.getElementById('app') as any)
    },
    back() {
      this.$router.push(this.App.state.current!.parent)
      this.$emit('back')
    },
    remove() {
      this.$emit('remove')
    }
  }
})
</script>

<style lang="scss" scoped>
.text-overflow {
  width: 100%;
  max-width: 220px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
