<template>
  <div class="logo">
    <nuxt-link to="/" class="d-flex align-end">
      <img width="25" src="/assets/img/logo.svg" />
      <div class="ml-3"><%= appName %></div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
