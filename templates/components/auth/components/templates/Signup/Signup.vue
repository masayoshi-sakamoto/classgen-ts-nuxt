<template>
  <v-container>
    <v-row justify="center">
      <v-card width="100%" max-width="380" flat>
        <v-card-title class="justify-center text-h4 font-weight-bold mb-5">会員登録</v-card-title>
        <v-card-text>
          <a-form id="form" v-slot="{ invalid }" @submit.prevent="$emit('submit', $event)">
            <FormSignup v-model="___value"></FormSignup>
            <a-btn submit :disabled="invalid">同意して登録する</a-btn>
          </a-form>
          <div class="mt-5 text-caption">
            会員登録には、<nuxt-link to="/term" class="grey--text">利用規約</nuxt-link>と<nuxt-link
              to="/policy"
              class="grey--text"
              >プライバシーポリシー</nuxt-link
            >への同意が必要です。
          </div>
          <v-divider class="mt-8"></v-divider>
          <div class="mt-8 text-center text-body-1">
            <nuxt-link to="/login">ログインはこちら</nuxt-link>
          </div>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { IAccountProps } from '@/entities/Account'
import FormSignup from '@/components/organisms/Form/Auth/Signup'

export default Vue.extend({
  components: {
    FormSignup
  },
  props: {
    value: {
      type: Object as PropType<IAccountProps>,
      default: undefined
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
