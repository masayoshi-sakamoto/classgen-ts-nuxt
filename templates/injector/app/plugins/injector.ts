/* eslint-disable */
import { Context } from '@nuxt/types/app'
import Vue from 'vue'

<%_ gateways.forEach((gateway) => { _%>
import { APIClient as <%= gateway %>APIClient } from '@/infrastructure/network/<%= gateway %>/APIClient'
<%_ }); _%>

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

export default (ctx: Context) => {
  const { store, app } = ctx
  <%_ gateways.forEach((gateway) => { _%>
  const <%= toUnderscoreCase(gateway) %>APIClient = new <%= gateway %>APIClient(ctx)
  <%_ }); _%>

  Vue.prototype.App = {
    state: new AppRepository(app.$cookies, store),
    <%_ repositories.forEach((file) => {
      const repository = file.split('.')[0]
      if (repository !== 'AppRepository') {
        const word = toUnderscoreCase(repository.split('Repository')[0])
    _%>
    <%= word %>: new <%= repository %>(app.$cookies, store),
    <%_ }}); _%>
    <%_ gateways.forEach((gateway) => { _%>
    <%= toUnderscoreCase(gateway) %>Gateway: new <%= gateway %>Gateway(<%= toUnderscoreCase(gateway) %>APIClient),
    <%_ }); _%>
  }

  ctx.App = {
    state: new AppRepository(app.$cookies, store),
    <%_ repositories.forEach((file) => {
      const repository = file.split('.')[0]
      if (repository !== 'AppRepository') {
        const word = toUnderscoreCase(repository.split('Repository')[0])
    _%>
    <%= word %>: new <%= repository %>(app.$cookies, store),
    <%_ }}); _%>
    <%_ gateways.forEach((gateway) => { _%>
    <%= toUnderscoreCase(gateway) %>Gateway: new <%= gateway %>Gateway(<%= toUnderscoreCase(gateway) %>APIClient),
    <%_ }); _%>
  }
}
