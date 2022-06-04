import { IOptions } from './options'
import Base from './base'
import { app } from './types'
import { error, upperCamel } from './common'

export default class Generator extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  async schema(name?: string) {
    this.swagger = this.load()
    for (const model of this.swagger.models) {
      if (!name || (name && model.ClassName === upperCamel(name))) {
        this.classname = model.ClassName
        await this.update('app/schemas/', app.root)
      }
    }
    await this.injector(true)
  }

  async auth(name?: string) {
    if (!name) {
      error('name is required.')
    }
    this.swagger = this.load()
    await this.update('app/auth', app.root)
    for (const model of ['auth', 'account']) {
      await this.entity(model)
    }
    await this.schema(name)
  }

  async index() {
    this.swagger = this.load()
    console.log(this.swagger)
    await this.injector(false)
  }

  async config() {
    await this.update('config', './')
  }

  async initialize() {
    await this.update('initialize', './')
    await this.entity('query')
  }

  private async injector(silent: boolean) {
    for (const model of this.swagger.models) {
      this.classname = model.ClassName
      await this.generate('app/models', app.root)
    }
    await this.generate('app/index', app.root, silent)
  }

  private async entity(name: string) {
    this.classname = name
    await this.update('app/schemas/entities', app.entities)
    await this.update('app/schemas/gateways/AppName/translator', app.translator)
  }
}
