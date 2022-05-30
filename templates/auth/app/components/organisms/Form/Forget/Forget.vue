<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-form>
      <validation-provider v-slot="{ errors }" name="メールアドレス" rules="required">
        <v-text-field label="メールアドレス" outlined :error-messages="errors"></v-text-field>
      </validation-provider>
      <div class="text-right">
        <v-btn depressed outlined color="grey" to="/login">キャンセル</v-btn>
        <v-btn depressed type="submit" :disabled="invalid" color="primary" class="ml-2">送信</v-btn>
      </div>
    </v-form>
  </validation-observer>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
  show: boolean
}

export default Vue.extend({
  data(): IData {
    return {
      show: false
    }
  }
})
</script>
