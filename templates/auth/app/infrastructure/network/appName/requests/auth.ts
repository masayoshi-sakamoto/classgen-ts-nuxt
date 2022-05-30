import { <%= appName %>, Account } from '@/infrastructure/network/<%= appName %>/schema'
import { APIRequest } from '@/infrastructure/network/APIRequest'
import { HTTPMethod } from '@/infrastructure/network/types'

export class Refresh implements APIRequest<<%= appName %>.Auth.authRefreshResponse> {
  response: <%= appName %>.Auth.authRefreshResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.GET
  constructor() {
    this.path = '/refresh'
  }
}

export class Signup implements APIRequest<<%= appName %>.Auth.authSignupResponse> {
  response: <%= appName %>.Auth.authSignupResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.POST
  params: <%= appName %>.Auth.authSignupRequest
  constructor(params: Account) {
    this.params = params
    this.path = '/signup'
  }
}

export class Login implements APIRequest<<%= appName %>.Auth.authSignupResponse> {
  response: <%= appName %>.Auth.authSignupResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.POST
  params: <%= appName %>.Auth.authSignupRequest
  constructor(params: Account) {
    this.params = params
    this.path = '/login'
  }
}

export class Logout implements APIRequest<<%= appName %>.Auth.autLogoutResponse> {
  response: <%= appName %>.Auth.autLogoutResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.GET
  constructor() {
    this.path = '/logout'
  }
}
