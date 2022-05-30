import { Context } from '@nuxt/types/app'
import { Middleware } from '@nuxt/types'
import refresh from '@/utils/refresh'

const authenticated: Middleware = async ({ App, route, redirect }: Context) => {
  if (App.auth.token) {
    await refresh(App)
    if (route.name === 'index') {
      redirect('/home')
    }
    return
  }

  if (route.name === 'index') {
    return
  }

  App.auth.logout()
  redirect('/login')
}

export default authenticated
