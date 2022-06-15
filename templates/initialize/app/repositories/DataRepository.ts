import { NuxtCookies } from 'cookie-universal-nuxt'
import { Store } from 'vuex'
import { RootState } from '@/store'
import * as types from '@/store/data/types'

export default class DataRepository {
  private cookies: NuxtCookies
  private store: Store<RootState>

  constructor(cookies: NuxtCookies, store: Store<RootState>) {
    this.cookies = cookies
    this.store = store
  }

  set loading(value: boolean) {
    this.store.commit(new types.Loading(value))
  }

  get loading(): boolean {
    return this.store.state.data.loading
  }

  set saving(value: boolean | null) {
    this.store.commit(new types.Saving(value))
  }

  get saving(): boolean | null {
    return this.store.state.data.saving
  }

  set removing(value: boolean | null) {
    this.store.commit(new types.Removing(value))
  }

  get removing(): boolean | null {
    return this.store.state.data.removing
  }

  set finished(value: boolean | null) {
    this.store.commit(new types.Finished(value))
  }

  get finished(): boolean | null {
    return this.store.state.data.finished
  }

  set errors(value: any) {
    this.store.commit(new types.Errors(value))
  }

  get errors(): any {
    return this.store.state.data.errors
  }

  set dialog(value: boolean | null) {
    this.store.commit(new types.Dialog(value))
  }

  get dialog(): boolean | null {
    return this.store.state.data.dialog
  }
}
