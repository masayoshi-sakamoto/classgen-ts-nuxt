<template>
  <v-navigation-drawer permanent color="accent" :app="app" :mini-variant="miniVariant" dark>
    <v-list dense nav>
      <v-list-item class="py-2">
        <v-list-item-content>
          <v-list-item-title><Logo></Logo></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item-group :value="selected" color="primary" active-class="active" :mandatory="!!selected">
        <v-list-item v-for="item in __admins" :key="item.id" @click="to(item)">
          <v-list-item-icon>
            <v-icon size="20">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="bam-text-md">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-spacer></v-spacer>
    <div>
      <v-list-item v-for="item in __subs" :key="item.id" class="px-3" @click="to(item)">
        <v-list-item-avatar v-if="item.icon" size="34">
          <v-icon class="secondary" size="16">{{ item.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="bam-text-md">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuEntity from '@/entities/Menu'
import admins from '@/assets/menus/admin'
import subs from '@/assets/menus/sub'
import Logo from '@/components/molecules/Logo'

interface IData {
  admins: any[]
  subs: any[]
}

export default Vue.extend({
  components: {
    Logo
  },
  props: {
    app: {
      type: Boolean,
      default: false
    },
    miniVariant: {
      type: Boolean,
      default: false
    }
  },
  data(): IData {
    return {
      admins,
      subs
    }
  },
  computed: {
    __admins(): MenuEntity[] {
      return this.admins.map((prop) => new MenuEntity(prop))
    },
    __subs(): MenuEntity[] {
      return this.subs.map((prop) => new MenuEntity(prop))
    },
    selected(): number | boolean {
      const index = this.admins.findIndex((prop) => new MenuEntity(prop).test(this.$route.name))
      return index >= 0 ? index : false
    }
  },
  methods: {
    to(value: MenuEntity) {
      this.$router.push(value.to)
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}
::v-deep .v-list-item__avatar:first-child {
  margin-right: 10px;
}
.active {
  color: white;
  background-color: #85a61caa;
  &:hover::before,
  &::before {
    opacity: 0;
  }
}
</style>
