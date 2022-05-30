import { IApp } from '@/types/nuxt'
import { I<%= className %>Props } from '@/entities/<%= className %>'
import refresh from '@/utils/refresh'

export default class Save<%= className %>UseCase implements BaseUseCase {
  App: IApp
  constructor(app: IApp) {
    this.App = app
  }

  async execute(props: I<%= className %>Props) {
    try {
      await refresh(this.App)
      await this.App.<%= toUnderscoreCase(appName) %>Gateway.<%= className %>.Save<%= className %>(props)
    } catch (exception: any) {
      if (exception.statusCode === 422 || exception.statusCode === 429) {
        this.App.state.errors = exception.errors
      } else {
        throw exception
      }
      return false
    }
    return true
  }
}
