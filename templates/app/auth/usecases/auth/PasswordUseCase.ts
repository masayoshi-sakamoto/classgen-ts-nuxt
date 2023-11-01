import { IAccountProps } from '@/entities/Account'
import { IApp } from '@/types/nuxt'

export default class PasswordUseCase implements BaseUseCase {
  constructor(protected App: IApp) {}

  async execute(props: IAccountProps) {
    try {
      this.App.state.loading = true
      this.App.auth.auth = await this.App.<%= appName %>Gateway.Auth.Password(props)
    } catch (exception: any) {
      this.App.logService.handle(exception)
      return false
    } finally {
      this.App.state.loading = false
    }
    return true
  }
}
