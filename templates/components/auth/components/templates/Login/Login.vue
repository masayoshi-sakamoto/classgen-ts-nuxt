<template>
  <div>
    <FormLogin v-model="___value"></FormLogin>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { IAccountProps } from '@/entities/Account'
import FormLogin from '@/components/organisms/Form/Login'

export default Vue.extend({
  components: {
    FormLogin
  },
  props: {
    value: {
      type: Object as PropType<IAccountProps>,
      default: undefined
    },
    items: {
      type: Array as PropType<IAccountProps[]>,
      default: () => []
    }
  },
  computed: {
    ___value: {
      set(value: IAccountProps) {
        this.$emit('input', value)
      },
      get(): IAccountProps {
        return this.value
      }
    }
  }
})
</script>
