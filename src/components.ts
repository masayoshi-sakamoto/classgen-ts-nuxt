import { IOptions } from './options'
import Base from './base'
import { app, components } from './types'
import { snake, upperCamel } from './common'

export default class Component extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  /**
   * 認証系のファイル生成
   */
  async first() {
    await this.update('components/first', app.root)
  }

  async form(name?: string) {
    this.swagger = this.load()
    const models = this.schemas().filter((model) => !this.configs.schemas!.excludes?.includes(model.ClassName))
    for (const model of models) {
      if (!name || (name && model.ClassName === upperCamel(name))) {
        this.classname = model.ClassName
        await this.update('components/' + components.organisms, components.organisms)
      }
    }
  }

  async page(name?: string) {
    this.swagger = this.load()
    if (name) {
      this.classname = name
      await this.update('components/app/pages', components.pages)
    } else {
      Object.keys(this.swagger.paths)
        .filter((key) => {
          return !this.configs.menu!.excludes!.includes(snake(key))
        })
        .forEach(async (key) => {
          this.classname = key
          await this.update('components/app/pages', components.pages)
        })
    }
  }
}
