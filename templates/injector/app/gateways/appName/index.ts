<%_ gatewayFiles.forEach((file) => {
    const gateway = file.split('.')[0]
    const Gateway = gateway.charAt(0).toUpperCase() + gateway.slice(1)
    if (gateway !== 'translator' && gateway !== 'index' && gateway !== 'base') {
  _%>
  import <%= Gateway %> from './<%= gateway %>'
  <%_ }}); _%>
  import { APIClient } from '@/infrastructure/network/<%= appName %>/APIClient'
  
  export default class <%= appName %>Gateway {
    apiClient: APIClient
    <%_ gatewayFiles.forEach((file) => {
      const gateway = file.split('.')[0]
      const Gateway = gateway.charAt(0).toUpperCase() + gateway.slice(1)
      if (gateway !== 'translator' && gateway !== 'index' && gateway !== 'base') {
    _%>
    <%= Gateway %>: <%= Gateway %>
    <%_ }}); _%>
  
    constructor(apiClient: APIClient) {
      this.apiClient = apiClient
      <%_ gatewayFiles.forEach((file) => {
        const gateway = file.split('.')[0]
        const Gateway = gateway.charAt(0).toUpperCase() + gateway.slice(1)
        if (gateway !== 'translator' && gateway !== 'index' && gateway !== 'base') {
      _%>
      this.<%= Gateway %> = new <%= Gateway %>(apiClient)
      <%_ }}); _%>
    }
  }