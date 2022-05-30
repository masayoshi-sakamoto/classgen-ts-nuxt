import { IApp } from '@/types/nuxt'
import AccountEntity from '@/entities/Account'

export default class AccountUseCase implements BaseUseCase {
  App: IApp
  constructor(app: IApp) {
    this.App = app
  }

  async execute(entity: AccountEntity) {
    try {
      this.App.auth.auth = await this.App.<%= appName.toLowerCase() %>Gateway.Auth.Signup(entity)
    } catch (exception: any) {
      if (exception.statusCode === 422) {
        this.App.state.errors = exception.errors
      } else {
        throw exception
      }
      return false
    }
    return true
  }
}
