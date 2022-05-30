import { Context } from '@nuxt/types/app'

// Repositories
import AppRepository from '@/repositories/AppRepository'
<%_ repositories.forEach((file) => {
  const repository = file.split('.')[0]
  if (repository !== 'AppRepository') {
_%>
import <%= repository %> from '@/repositories/<%= repository %>'
<%_ }}); _%>

// Gateways
<%_ gateways.forEach((gateway) => { _%>
import <%= gateway %>Gateway from '@/gateways/<%= gateway %>'
<%_ }); _%>

declare module 'vuex/types/index' {
  interface ActionTree<S, R> {
    nuxtServerInit: (context: ActionContext<S, R>, nuxtContext: Context) => void
  }
}

export interface IApp {
  // Status
  state: AppRepository

  // Repositories
  <%_ repositories.forEach((file) => {
    const repository = file.split('.')[0]
    if (repository !== 'AppRepository') {
      const word = repository.split('Repository')[0].toLowerCase()
  _%>
  <%= word %>: <%= repository %>
  <%_ }}); _%>

  // Gateways
  <%_ gateways.forEach((gateway) => { _%>
  <%= gateway.toLowerCase() %>Gateway: <%= gateway %>Gateway
  <%_ }); _%>
}

declare module 'vue/types/vue' {
  interface Vue {
    App: IApp
  }
}

declare module '@nuxt/types/app/index' {
  interface Context {
    App: IApp
  }
}
