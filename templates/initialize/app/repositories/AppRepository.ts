import { NuxtCookies } from 'cookie-universal-nuxt'
import { Store } from 'vuex'
import { RootState } from '@/store'
import * as types from '@/store/app/types'
import MenuEntity from '@/entities/Menu'

export default class AppRepository {
  private cookies: NuxtCookies
  private store: Store<RootState>

  constructor(cookies: NuxtCookies, store: Store<RootState>) {
    this.cookies = cookies
    this.store = store
  }

  clear() {
    this.store.commit(new types.Clear())
  }

  set loading(value: boolean) {
    this.store.commit(new types.Loading(value))
  }

  get loading(): boolean {
    return this.store.state.app.loading
  }

  set errors(value: any) {
    this.store.commit(new types.Errors(value))
  }

  get errors(): any {
    return this.store.state.app.errors
  }

  set drawer(value: boolean | null) {
    this.store.commit(new types.Drawer(value))
  }

  get drawer(): boolean | null {
    return this.store.state.app.drawer
  }

  set menus(value: MenuEntity[] | null) {
    this.store.commit(new types.Menus(value))
  }

  get menus(): MenuEntity[] | null {
    return this.store.state.app.menus
  }
}
