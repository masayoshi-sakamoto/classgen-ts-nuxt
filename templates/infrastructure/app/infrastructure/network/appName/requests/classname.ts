import { <%= appName %>, <%= className %>Seed } from '@/infrastructure/network/<%= appName %>/schema'
import { APIRequest } from '@/infrastructure/network/APIRequest'
import { HTTPMethod } from '@/infrastructure/network/types'
import { IQueryProps } from '@/entities/Query'

export class Get<%= className %> implements APIRequest<<%= appName %>.<%= className %>.get<%= className %>Response> {
  response: <%= appName %>.<%= className %>.get<%= className %>Response
  path: string
  contentType = 'application/json'
  method = HTTPMethod.GET
  constructor(<%= classname %>Id: string) {
    this.path = `/<%= classname %>s/${<%= classname %>Id}`
  }
}

export class Fetch<%= className %>s implements APIRequest<<%= appName %>.<%= className %>.get<%= className %>sResponse> {
  response: <%= appName %>.<%= className %>.get<%= className %>sResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.GET
  params?: IQueryProps
  constructor(query?: IQueryProps) {
    this.params = query
    this.path = '/<%= classname %>s'
  }
}

export class Post<%= className %> implements APIRequest<<%= appName %>.<%= className %>.post<%= className %>Response> {
  response: <%= appName %>.<%= className %>.post<%= className %>Response
  path: string
  contentType = 'application/json'
  method = HTTPMethod.POST
  params: <%= appName %>.<%= className %>.post<%= className %>Request
  constructor(params: <%= className %>Seed) {
    this.params = params
    this.path = '/<%= classname %>s'
  }
}

export class Put<%= className %> implements APIRequest<<%= appName %>.<%= className %>.put<%= className %>Response> {
  response: <%= appName %>.<%= className %>.put<%= className %>Response
  path: string
  contentType = 'application/json'
  method = HTTPMethod.PUT
  params: <%= appName %>.<%= className %>.put<%= className %>Request
  constructor(params: <%= className %>Seed) {
    const <%= classname %>Id = params.id
    this.params = params
    this.path = `/<%= classname %>s/${<%= classname %>Id}`
  }
}

export class Delete<%= className %> implements APIRequest<<%= appName %>.<%= className %>.delete<%= className %>Response> {
  response: <%= appName %>.<%= className %>.delete<%= className %>Response
  path: string
  contentType = 'application/json'
  method = HTTPMethod.DELETE
  constructor(<%= classname %>Id: string) {
    this.path = `/<%= classname %>s/${<%= classname %>Id}`
  }
}
