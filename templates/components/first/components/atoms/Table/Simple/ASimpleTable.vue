<template>
  <v-simple-table>
    <thead v-if="!App.data.none && !noHeader">
      <tr>
        <th v-if="selectale">
          <v-checkbox
            :input-value="__all"
            hide-details
            :indeterminate="__selected.length > 0 && __selected.length !== items.length"
            :ripple="false"
            class="ma-0"
            @change="all"
          ></v-checkbox>
        </th>
        <th v-for="(header, j) in __headers" :key="j" :class="{ [header.class]: header.class }">
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody v-if="App.data.loading">
      <tr v-for="i in __length" :key="i">
        <td v-if="selectale"><v-skeleton-loader type="table-cell"></v-skeleton-loader></td>
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
    <tbody v-else>
      <tr
        v-for="(item, i) in __items"
        :key="i"
        :class="{ hover: !disabledClick }"
        @click="disabledClick ? undefined : $emit('click', item)"
      >
        <td v-if="selectale">
          <v-checkbox
            v-if="!item.checked || (item.checked && item.checked(App.user.current.id))"
            v-model="__selected"
            :value="item.id"
            hide-details
            :ripple="false"
            class="ma-0"
            @click.stop=""
          ></v-checkbox>
        </td>
        <td v-for="(key, j) in __headers" :key="j" :class="{ [key.class]: key.class }">
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
    </tbody>
  </v-simple-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

interface IData {
  selected: string[]
}

const component = Vue.extend({
  props: {
    items: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    headers: {
      type: Array as PropType<any[]>,
      default: undefined
    },
    length: {
      type: Number,
      default: null
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    disabledClick: {
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
      selected: []
    }
  },
  computed: {
    __all: {
      get(): boolean {
        return this.__selected.length > 0 && this.__selected.length === this.items.length
      },
      set(value: boolean) {
        if (value) {
          this.__selected = this.items.flatMap((prop) => {
            if (!prop.checked || (prop.checked && prop.checked(this.App.user.current.id))) {
              return prop.id
            }
            return []
          })
        } else {
          this.__selected = []
        }
      }
    },
    __selected: {
      get(): string[] {
        return this.selected
      },
      set(value: string[]) {
        this.selected = value
        this.$emit('change', this.selected)
      }
    },
    __length(): number {
      return this.length || 10
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
  },
  watch: {
    items() {
      this.__all = false
    }
  },
  methods: {
    all(value: boolean) {
      this.__all = value
    }
  }
})
Vue.component('ASimpleTable', component)
export default component
</script>

<style lang="scss" scoped>
@include media-breakpoint('sm-and-down') {
  tbody {
    tr {
      td {
        white-space: nowrap;
      }
    }
  }
}
thead {
  tr {
    th {
      height: 36px !important;
      font-size: 0.5rem !important;
      background-color: var(--v-background-base);
    }
  }
}
tbody {
  tr.hover {
    &:hover {
      cursor: pointer;
      background-color: transparent !important;
    }
  }
  tr {
    &:hover {
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
