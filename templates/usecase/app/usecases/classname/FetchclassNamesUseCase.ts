import { IApp } from '@/types/nuxt'
import refresh from '@/utils/refresh'

export default class Fetch<%= className %>sUseCase implements BaseUseCase {
  App: IApp
  constructor(app: IApp) {
    this.App = app
  }

  async execute() {
    try {
      await refresh(this.App)
      const response = await this.App.bamboooGateway.<%= className %>.Fetch<%= className %>s(this.App.<%= classname %>.options)
      this.App.<%= classname %>.fetched = response.items
      this.App.<%= classname %>.query = response.query
      this.App.<%= classname %>.options = {
        ...this.App.<%= classname %>.options,
        ...response.options
      }
    } catch (exception: any) {
      return false
    }
    return true
  }
}
