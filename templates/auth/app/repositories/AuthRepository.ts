import { NuxtCookies } from 'cookie-universal-nuxt'
import { Store } from 'vuex'
import { RootState } from '@/store'
import { EmptyAuthPropsFactory, IAuthProps } from '@/entities/Auth'

export default class AppRepository {
  private cookies: NuxtCookies
  private store: Store<RootState>

  constructor(cookies: NuxtCookies, store: Store<RootState>) {
    this.cookies = cookies
    this.store = store
  }

  logout() {
    this.auth = null
  }

  set auth(value: IAuthProps | null) {
    if (value) {
      // トークンの利用可能時間を保存
      const date = new Date().getTime() + 1000 * 60 * Number(value.expired)
      this.cookies.set('accessToken', value.accessToken, { path: '/', maxAge: 60 * 60 * 24 * 14 }) // 2週間
      this.cookies.set('tokenType', value.tokenType, { path: '/', maxAge: 60 * 60 * 24 * 14 }) // 2週間
      this.cookies.set('expired', date, { path: '/', maxAge: 60 * 60 * 24 * 14 }) // 2週間
    } else {
      this.cookies.remove('accessToken', { path: '/', maxAge: 1 })
      this.cookies.remove('tokenType', { path: '/', maxAge: 1 })
      this.cookies.remove('expired', { path: '/', maxAge: 1 })
    }
  }

  get auth(): IAuthProps | null {
    return EmptyAuthPropsFactory({
      accessToken: this.cookies.get('accessToken'),
      tokenType: this.cookies.get('tokenType'),
      expired: this.cookies.get('expired')
    })
  }

  get token(): string {
    return this.cookies.get('accessToken')
  }

  get expired(): number {
    return Number(this.cookies.get('expired'))
  }
}
