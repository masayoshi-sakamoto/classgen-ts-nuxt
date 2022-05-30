<template>
  <LayoutAuth>
    <v-container>
      <v-row justify="center">
        <v-card width="100%" max-width="380" flat>
          <v-card-title class="justify-center text-h4 font-weight-bold mb-5">パスワード再設定</v-card-title>
          <v-card-text>
            <FormForget></FormForget>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </LayoutAuth>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutAuth from '@/components/organisms/Layout/Auth'
import FormForget from '@/components/organisms/Form/Forget'

export default Vue.extend({
  components: {
    LayoutAuth,
    FormForget
  }
})
</script>
