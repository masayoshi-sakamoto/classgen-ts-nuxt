<template>
  <v-pagination
    color="accent"
    :value="value"
    :length="length"
    :total-visible="7"
    :class="justify"
    @input="$emit('input', $event)"
  ></v-pagination>
</template>

<script lang="ts">
import Vue from 'vue'

const component = Vue.extend({
  props: {
    value: {
      type: Number,
      default: 1
    },
    length: {
      type: Number,
      default: 5
    },
    justify: {
      type: String,
      default: 'center'
    }
  }
})
Vue.component('APagination', component)
export default component
</script>

<style lang="scss" scoped>
::v-deep .v-pagination__navigation,
::v-deep .v-pagination__item {
  box-shadow: none;
  border-radius: 0px;
  border: 1px var(--v-border-base) solid;
}
.center::v-deep .v-pagination {
  justify-content: center;
}
.start::v-deep .v-pagination {
  justify-content: start;
}
.end::v-deep .v-pagination {
  justify-content: end;
}
@media screen and (max-width: 600px) {
  .start::v-deep .v-pagination {
    justify-content: center;
  }
  .end::v-deep .v-pagination {
    justify-content: center;
  }
}
</style>
