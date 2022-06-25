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
      this.cookies.set(process.env.APP_NAME + '_accessToken', value.accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 14
      }) // 2週間
      this.cookies.set(process.env.APP_NAME + '_tokenType', value.tokenType, { path: '/', maxAge: 60 * 60 * 24 * 14 }) // 2週間
      this.cookies.set(process.env.APP_NAME + '_expired', date, { path: '/', maxAge: 60 * 60 * 24 * 14 }) // 2週間
    } else {
      this.cookies.remove(process.env.APP_NAME + '_accessToken', { path: '/', maxAge: 1 })
      this.cookies.remove(process.env.APP_NAME + '_tokenType', { path: '/', maxAge: 1 })
      this.cookies.remove(process.env.APP_NAME + '_expired', { path: '/', maxAge: 1 })
    }
  }

  get auth(): IAuthProps | null {
    return EmptyAuthPropsFactory({
      accessToken: this.cookies.get(process.env.APP_NAME + '_accessToken'),
      tokenType: this.cookies.get(process.env.APP_NAME + '_tokenType'),
      expired: this.cookies.get(process.env.APP_NAME + '_expired')
    })
  }

  get token(): string {
    return this.cookies.get(process.env.APP_NAME + '_accessToken')
  }

  get expired(): number {
    return Number(this.cookies.get(process.env.APP_NAME + '_expired'))
  }
}
