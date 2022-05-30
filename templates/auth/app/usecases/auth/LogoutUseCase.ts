import refresh from '@/utils/refresh'
import { IApp } from '@/types/nuxt'

export default class LogoutUseCase implements BaseUseCase {
  App: IApp
  constructor(app: IApp) {
    this.App = app
  }

  async execute() {
    try {
      await refresh(this.App)
      return await this.App.<%= appName.toLowerCase() %>Gateway.Auth.Logout()
    } catch (exception) {
      return false
    }
  }
}
