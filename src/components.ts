import { IOptions } from './options'
import Base from './base'
import { app, components } from './types'

export default class Component extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  async form(name?: string) {
    await this.update('components/index', components.organisms)
  }

  async auth(name?: string) {
    await this.update('components/auth', app.root)
  }
}
