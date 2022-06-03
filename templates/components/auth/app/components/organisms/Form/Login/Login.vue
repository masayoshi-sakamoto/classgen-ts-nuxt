<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <a-text-field
          v-model.trim="props.username"
          label="メールアドレス/ユーザーID"
          field="username"
          rules="required"
          @change="change"
        ></a-text-field>
      </v-col>
      <v-col>
        <a-text-field
          v-model.trim="props.password"
          password
          label="パスワード"
          field="password"
          rules="required"
          @change="change"
        ></a-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import AccountEntity, { EmptyAccountPropsFactory, IAccountProps } from '@/entities/Account'

interface IData {
  props: IAccountProps
}

export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<IAccountProps>,
      default: undefined
    }
  },
  data(): IData {
    return {
      props: EmptyAccountPropsFactory()
    }
  },
  watch: {
    value: {
      handler() {
        this.props = this.value ? new AccountEntity(this.value).clone : EmptyAccountPropsFactory()
      },
      immediate: true
    }
  },
  methods: {
    change() {
      this.$emit('input', this.props)
      this.$emit('change', this.props)
    }
  }
})
</script>
