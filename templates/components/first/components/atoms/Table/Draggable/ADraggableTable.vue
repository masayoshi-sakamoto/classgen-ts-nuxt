<template>
  <v-simple-table>
    <thead v-if="!App.data.none && !noHeader">
      <tr>
        <th class="min"></th>
        <th v-for="(header, j) in __headers" :key="j" :class="{ [header.class]: header.class }">
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody v-if="App.data.loading && __items.length === 0">
      <tr v-for="i in 20" :key="i">
        <td></td>
        <td v-for="(key, j) in __headers" :key="j">
          <v-skeleton-loader type="table-cell"></v-skeleton-loader>
        </td>
      </tr>
    </tbody>
    <tbody v-else-if="App.data.none">
      <tr>
        <td>
          <slot name="no-data"></slot>
        </td>
      </tr>
    </tbody>
    <vuedraggable v-else v-model="__items" tag="tbody" handle=".grab" animation="100" @update="$emit('change')">
      <tr v-for="(item, i) in __items" :key="i" :value="item" @click="$emit('click', item)">
        <td class="min grab"><v-icon>mdi-drag-vertical</v-icon></td>
        <td v-for="(key, j) in __headers" :key="j" :class="`${key.align} ${key.class}`">
          <slot :name="key.value" v-bind="{ [key.value]: item[key.value], data: item.props }">
            <template v-if="key.icon">
              <v-icon size="20">{{ item[key.value] }}</v-icon>
            </template>
            <template v-else>
              {{ item[key.value] }}
            </template>
          </slot>
        </td>
      </tr>
    </vuedraggable>
  </v-simple-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import vuedraggable from 'vuedraggable'

interface IData {
  state: any
}
const component = Vue.extend({
  components: {
    vuedraggable
  },
  props: {
    items: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    headers: {
      type: Array as PropType<any[]>,
      default: undefined
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    length: {
      type: Number,
      default: 20
    }
  },
  data(): IData {
    return {
      state: null
    }
  },
  computed: {
    __length(): number {
      return this.length || 20
    },
    __items: {
      set(value: any[]) {
        this.$emit('update:items', value)
      },
      get(): any[] {
        return this.items
      }
    },
    __headers(): any[] {
      return (
        this.headers ||
        Object.keys(this.items[0]).map((prop) => ({
          text: prop,
          value: prop
        }))
      )
    }
  }
})
Vue.component('ADraggableTable', component)
export default component
</script>

<style lang="scss" scoped>
tbody {
  tr {
    &:hover {
      cursor: pointer;
      background-color: transparent !important;
    }
    td {
      &.min {
        width: 1px;
        white-space: nowrap;
      }
      &.max {
        width: auto;
        white-space: normal;
      }
    }
  }
}
</style>
