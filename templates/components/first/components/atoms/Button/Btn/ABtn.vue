<template>
  <v-btn :height="dense ? 30 : undefined" depressed :disabled="$attrs.disabled" v-bind="__attrs" v-on="$listeners">
    <span :class="__attrs.textColor">
      <slot v-if="__attrs.prepend" name="prepend">
        <v-icon size="14" class="mr-1">{{ __attrs.prepend }}</v-icon>
      </slot>
      <slot><v-icon v-if="attrs.close">fal fa-xmark</v-icon></slot>
    </span>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
  default: any
  attrs: any
}

const component = Vue.extend({
  props: {
    icon: {
      type: [String, Boolean],
      default: undefined
    },
    dense: {
      type: Boolean,
      default: false
    }
  },
  data(): IData {
    return {
      default: {
        color: 'primary',
        class: 'rounded-sm',
        textColor: undefined
      },
      attrs: {
        submit: {
          block: true,
          xLarge: true,
          type: 'submit'
        },
        cancel: {
          outlined: true,
          color: 'grey',
          textColor: 'black--text'
        },
        add: {
          rounded: true,
          prepend: 'fas fa-circle-plus',
          class: 'px-6'
        },
        vicon: {
          color: 'secondary',
          plain: true,
          icon: true,
          ripple: false
        },
        close: {
          color: 'secondary',
          plain: true,
          icon: true,
          ripple: false
        }
      }
    }
  },
  computed: {
    __attrs(): any {
      const index = Object.entries(this.$attrs).find(([key, value]) =>
        value === '' ? Object.keys(this.attrs).includes(key) : false
      )
      const attrs = index ? this.attrs[index[0]] : {}
      return {
        ...this.default,
        ...attrs,
        ...this.$attrs
      }
    }
  }
})
Vue.component('ABtn', component)
export default component
</script>

<style lang="scss" scoped>
::v-deep {
  .v-btn__content {
    .prepend {
      left: 0;
      position: absolute;
    }
    i {
      margin-top: -3px;
    }
  }
}
</style>
