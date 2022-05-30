import { <%= appName %>GatewayBase } from './base'
import { toAccountSeed } from './translator/account'
import { toAuthProps } from './translator/auth'
import { Refresh, Signup, Login, Logout } from '@/infrastructure/network/<%= appName %>/requests/auth'
import AccountEntity from '@/entities/Account'

export default class Auth extends <%= appName %>GatewayBase {
  async Refresh() {
    const { auth } = await this.apiClient.request(new Refresh())
    return toAuthProps(auth)
  }

  async Signup(entity: AccountEntity) {
    const { auth } = await this.apiClient.request(new Signup(toAccountSeed(entity.props)))
    return toAuthProps(auth)
  }

  async Login(entity: AccountEntity) {
    const { auth } = await this.apiClient.request(new Login(toAccountSeed(entity.props)))
    return toAuthProps(auth)
  }

  async Logout() {
    const { logout } = await this.apiClient.request(new Logout())
    return logout
  }  
}
