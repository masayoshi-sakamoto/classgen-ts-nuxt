import { IOptions } from './options'
import Base from './base'
import { app, components } from './types'
import { snake, upperCamel } from './common'

export default class Component extends Base {
  constructor(protected options: IOptions) {
    super(options)
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

  async form(name?: string) {
    this.swagger = this.load()
    const models = this.entities().filter((model) => !this.configs.schemas!.excludes?.includes(model.ClassName))
    for (const model of models) {
      if (!name || (name && model.ClassName === upperCamel(name))) {
        this.classname = model.ClassName
        await this.update('components/' + components.organisms, components.organisms)
      }
    }
  }

  async auth(name?: string) {
    this.swagger = this.load()
    this.classname = 'account'
    await this.update('components/auth', app.root)
  }

  async web(name?: string) {
    this.swagger = this.load()
    this.classname = 'account'
    await this.update('components/web', app.root)
  }

  async menu(name?: string) {
    this.swagger = this.load()
    this.classname = name || this.classname
    await this.update('components/app/assets', components.assets)
  }
}
