import { IApp } from '@/types/nuxt'
import { IAccountProps } from '@/entities/Account'

export default class ProfileUseCase implements BaseUseCase {
  constructor(protected App: IApp) {}

  async execute(props: IAccountProps) {
    try {
      this.App.auth.auth = await this.App.<%= appName %>Gateway.Auth.Profile(props)
    } catch (exception: any) {
      this.App.logService.handle(exception)
      return false
    }
    return true
  }
}
