<template>
  <TtemplateLogin v-model="value"></TtemplateLogin>
</template>

<script lang="ts">
import Vue from 'vue'
import TtemplateLogin from '@/components/templates/Login'
import { IAccountProps } from '@/entities/Account'

interface IData {
  value: IAccountProps | undefined
}

export default Vue.extend({
  components: {
    TtemplateLogin
  },
  layout: 'auth',
  data(): IData {
    return {
      value: undefined
    }
  }
})
</script>
