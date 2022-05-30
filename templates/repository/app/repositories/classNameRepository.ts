import { NuxtCookies } from 'cookie-universal-nuxt'
import { Store } from 'vuex'
import { RootState } from '@/store'
import * as types from '@/store/<%= classname %>/types'
import { IOptionsProps } from '@/entities/Options'
import { I<%= className %>Props } from '@/entities/<%= className %>'
import { IQueryProps } from '@/entities/Query'

export default class <%= className %>Repository {
  private cookies: NuxtCookies
  private store: Store<RootState>

  constructor(cookies: NuxtCookies, store: Store<RootState>) {
    this.cookies = cookies
    this.store = store
  }

  get fetched(): I<%= className %>Props[] {
    return this.store.state.<%= classname %>.fetched
  }

  set fetched(value: I<%= className %>Props[]) {
    this.store.commit(new types.Fetched(value))
    this.store.commit(new types.Store(value))
  }

  set query(value: IQueryProps) {
    this.store.commit(new types.Query(value))
  }

  get query(): IQueryProps {
    return this.store.state.<%= classname %>.query
  }

  set options(value: IOptionsProps) {
    this.store.commit(new types.Options(value))
  }

  get options(): IOptionsProps {
    return this.store.state.<%= classname %>.options
  }

  set loading(value: boolean) {
    this.store.commit(new types.Loading(value))
  }

  get loading(): boolean {
    return this.store.state.<%= classname %>.loading
  }

  set current(value: I<%= className %>Props) {
    this.store.commit(new types.Current(value))
  }

  get current(): I<%= className %>Props {
    return this.store.state.<%= classname %>.current
  }

  get items() {
    return new Proxy(this.store.state.<%= classname %>.byIds, {
      get(target, prop) {
        if (typeof prop === 'symbol') {
          return Object.getOwnPropertySymbols(target)[prop]
        }
        return target[prop]
      }
    })
  }
}
