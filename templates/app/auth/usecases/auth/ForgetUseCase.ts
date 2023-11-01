import { IApp } from '@/types/nuxt'
import { IAccountProps } from '@/entities/Account'

export default class ForgetUseCase implements BaseUseCase {
  constructor(protected App: IApp) {}

  async execute(props: IAccountProps) {
    try {
      this.App.state.loading = true
      await this.App.<%= appName %>Gateway.Auth.Forget(props)
    } catch (exception: any) {
      this.App.logService.handle(exception)
      return false
    } finally {
      this.App.state.loading = false
    }
    return true
  }
}
