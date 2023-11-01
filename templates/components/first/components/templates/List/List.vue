<template>
  <v-container fluid>
    <client-only>
      <a-toolbar>
        <template #toolbar>
          <slot name="title">
            <div>{{ App.state.current?.pageTitle }}</div>
          </slot>
          <v-spacer></v-spacer>
          <slot name="add">
            <a-btn v-if="!disabledEdit" add small @click="add()">{{ __title }}の登録</a-btn>
          </slot>
          <slot name="buttons"></slot>
        </template>
        <template #extension>
          <v-row dense align="center">
            <v-col cols="auto">
              <v-layout align-center>
                <a-search v-model="__word"></a-search>
                <div class="ml-2 secondary--text">{{ query.total }}件</div>
              </v-layout>
            </v-col>
            <v-spacer></v-spacer>
            <v-col v-if="selectale" cols="auto" class="d-none d-md-block">
              <a-btn color="error" width="100" :disabled="selected.length === 0" small @click="remove">削除</a-btn>
            </v-col>
            <v-col v-if="filters" cols="auto" class="d-none d-md-block">
              <a-filter :items="filters" @change="$emit('filters', $event)"></a-filter>
            </v-col>
            <v-col v-if="!draggable" cols="auto" class="d-none d-md-block">
              <a-items-par-page v-model="__itemsParPage"></a-items-par-page>
            </v-col>
            <v-col cols="auto" class="d-md-none">
              <v-menu v-model="menu" :close-on-content-click="false">
                <template #activator="{ on, attrs }">
                  <v-btn icon small v-bind="attrs" v-on="on">
                    <v-icon small>fas fa-bars</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <a-items-par-page v-model="__itemsParPage" @change="menu = false"></a-items-par-page>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="selectale">
                    <v-list-item-content>
                      <a-btn
                        color="error"
                        block
                        :disabled="selected.length === 0"
                        small
                        @click="
                          remove()
                          menu = false
                        "
                        >削除</a-btn
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </template>
      </a-toolbar>
    </client-only>
    <slot>
      <div class="overflow">
        <a-draggable-table
          v-if="draggable"
          :items.sync="__items"
          :headers="headers"
          :length="__itemsParPage"
          :no-header="noHeader"
          @click="add($event)"
        >
          <template #no-data>
            <slot name="no-data">
              <div class="pa-5 text-center">
                <template v-if="__word">
                  <div class="text-body-1 mb-5">
                    検索ワード「<span class="font-weight-bold">{{ __word }}</span
                    >」は見つかりませんでした。
                  </div>
                </template>
                <template v-else>
                  <div class="text-body-1 mb-5">
                    {{ __title }}が登録されていません。<br />
                    新規データを作成しましょう。
                  </div>
                  <a-btn x-large @click="add()">新規{{ __title }}の登録</a-btn>
                </template>
              </div>
            </slot>
          </template>
          <template v-for="key in headers" #[key.value]="{ data }">
            <slot :name="key.value" v-bind="{ [key.value]: data[key.value], data }"></slot>
          </template>
        </a-draggable-table>
        <a-simple-table
          v-else
          :items="items"
          :headers="headers"
          :length="__itemsParPage"
          :disabled-click="disabledClick"
          :no-header="noHeader"
          :selectale="selectale"
          @click="add($event)"
          @change="change"
        >
          <template #no-data>
            <slot name="no-data">
              <div class="pa-2 py-5 pa-md-5 text-center">
                <template v-if="__word">
                  <div class="text-body-1 mb-5">
                    検索ワード「<span class="font-weight-bold">{{ __word }}</span
                    >」は見つかりませんでした。
                  </div>
                </template>
                <template v-else>
                  <div class="text-body-1 mb-5">
                    {{ __title }}が登録されていません。<br />
                    新規データを作成しましょう。
                  </div>
                  <a-btn x-large @click="add()">新規{{ __title }}の登録</a-btn>
                </template>
              </div>
            </slot>
          </template>
          <template v-for="key in headers" #[key.value]="{ data }">
            <slot :name="key.value" v-bind="{ [key.value]: data[key.value], data }"></slot>
          </template>
          <template #actions="{ actions, data }">
            <a-btn
              v-for="(action, i) in actions"
              :key="i"
              small
              :color="action.color"
              @click="$emit(action.value, data.props)"
              >{{ action.text }}</a-btn
            >
          </template>
        </a-simple-table>
      </div>
      <client-only>
        <infinite-loading
          v-if="draggable"
          ref="infiniteLoading"
          :identifier="infiniteId"
          spinner="spiral"
          @infinite="infiniteHandler"
        >
          <div slot="no-more"></div>
          <div slot="no-results"></div>
          <div slot="spinner"></div>
        </infinite-loading>
      </client-only>
    </slot>
    <slot name="extension"> </slot>
    <a-pagination
      v-if="!draggable && query.count && query.count > 1"
      v-model="__page"
      class="mt-5"
      :length="query.count"
    ></a-pagination>
    <a-loading :value="App.data.removing" absolute></a-loading>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import VueScrollTo from 'vue-scrollto'
import { EmptyOptionsPropsFactory, IOptionsProps } from '@/entities/Options'
import { EmptyQueryPropsFactory, IQueryProps } from '@/entities/Query'

interface IData {
  item: any
  dialog: boolean
  state: any
  menu: boolean
  selected: string[]
}

export default Vue.extend({
  components: {
    InfiniteLoading
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    query: {
      type: Object as PropType<IQueryProps>,
      default: () => EmptyQueryPropsFactory()
    },
    options: {
      type: Object as PropType<IOptionsProps>,
      default: () => EmptyOptionsPropsFactory()
    },
    headers: {
      type: Array as PropType<any>,
      default: undefined
    },
    filters: {
      type: Array,
      default: undefined
    },
    draggable: {
      type: Boolean,
      default: false
    },
    indexName: {
      type: String,
      default: 'id'
    },
    infiniteId: {
      type: Number,
      default: Date.now()
    },
    title: {
      type: String,
      default: null
    },
    disabledClick: {
      type: Boolean,
      default: false
    },
    disabledEdit: {
      type: Boolean,
      default: false
    },
    clicked: {
      type: Boolean,
      default: true
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    selectale: {
      type: Boolean,
      default: false
    }
  },
  data(): IData {
    return {
      item: null,
      dialog: false,
      state: null,
      menu: false,
      selected: []
    }
  },
  computed: {
    __title(): string | undefined | null {
      return this.title || this.App.state.current?.pageTitle
    },
    __items: {
      set(value: any[]) {
        this.$emit('update:items', value)
      },
      get(): any[] {
        return this.items
      }
    },
    __options: {
      get(): any {
        return this.options
      },
      set(value: any) {
        this.$emit('update:options', {
          ...this.options,
          ...value
        })
      }
    },
    __page: {
      get(): any {
        return this.options.page || 0
      },
      set(value: any) {
        this.$emit('update:options', {
          ...this.options,
          page: value
        })
        this.$emit('fetch')
        this.scrollTop()
      }
    },
    __itemsParPage: {
      get(): number {
        return this.options ? Number(this.options.itemsPerPage) : 10
      },
      set(value: number) {
        this.$emit('update:options', {
          ...this.options,
          page: 1,
          itemsPerPage: value
        })
        this.$emit('fetch')
      }
    },
    __word: {
      get(): any {
        return this.options ? this.options.word : null
      },
      set(value: any) {
        this.$emit('update:options', {
          ...this.options,
          page: 1,
          word: value
        })
        this.$emit('reset')
      }
    }
  },
  watch: {
    items() {
      if (this.state && this.items.length > 0) {
        if (this.query.total === undefined || this.items.length < this.query.total) {
          this.state.loaded()
        } else {
          this.state.complete()
        }
      }
    }
  },
  methods: {
    change(value: string[]) {
      this.selected = value
    },
    remove() {
      this.$emit('remove', this.selected)
    },
    scrollTop() {
      VueScrollTo.scrollTo(document.getElementById('app') as any)
    },
    add(value?: any) {
      if (!this.disabledClick && this.clicked) {
        const id = value ? value.id : 'create'
        this.$router.push({
          name: this.App.state.current!.route + '-' + this.indexName,
          params: { [this.indexName]: id }
        })
      }
      this.$emit('add', value)
    },
    infiniteHandler(state: any) {
      this.state = state
      if (this.query.total === undefined || this.items.length < this.query.total) {
        this.$emit('update:options', {
          ...this.options,
          page: (this.options.page || 0) + 1
        })
        this.$emit('fetch')
      } else {
        this.state.complete()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.overflow {
  overflow-x: auto;
}
</style>
