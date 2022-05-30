import { IApp } from '@/types/nuxt'
import { I<%= className %>Props } from '@/entities/<%= className %>'
import refresh from '@/utils/refresh'

export default class Delete<%= className %>UseCase implements BaseUseCase {
  App: IApp
  constructor(app: IApp) {
    this.App = app
  }

  async execute(props: I<%= className %>Props) {
    await refresh(this.App)
    await this.App.<%= toUnderscoreCase(appName) %>Gateway.<%= className %>.Delete<%= className %>(props)
  }
}
