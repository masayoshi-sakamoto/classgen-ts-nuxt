import { IOptions } from './options'
import Base from './base'
import { app, swagger } from './types'
import { snake } from './common'

export default class Remove extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  async all(name?: string) {
    const names = await this.schemas(name)
    for (const name of names) {
      this.classname = name
      this.swagger = this.load()
      await this.remove('app/schemas', app.root)
      await this.remove('app/usecases', app.root)
      await this.generate('app/index', app.root, true)
    }
  }

  async schema(name: string) {
    const names = await this.schemas(name)
    for (const name of names) {
      this.classname = name
      this.swagger = this.load()
      await this.remove('app/schemas', app.root)
      await this.generate('app/index', app.root, true)
    }
  }

  async usecase(name: string) {
    const names = await this.schemas(name)
    for (const name of names) {
      this.classname = name
      this.swagger = this.load()
      await this.remove('app/usecases', app.root)
      await this.generate('app/index', app.root, true)
    }
  }

  async auth(name?: string) {
    this.classname = name || this.classname
    this.swagger = this.load()
    await this.remove('app/auth', app.root)

    for (const schema of ['account', 'auth', name]) {
      this.classname = schema || this.classname
      await this.remove('app/schemas', app.root)
    }

    this.classname = name || this.classname
    await this.remove('app/usecases', app.root)
    await this.generate('app/index', app.root, true)
  }

  async index(name?: string) {
    this.classname = name || this.classname
    await this.remove('app/index', app.root)
  }

  async config() {
    await this.remove('config', './')
  }

  async initialize() {
    await this.remove('initialize', './')
  }

  async sql() {
    console.info('done sql.')
  }

  private async schemas(name?: string) {
    const files = this.readfiles(swagger.schemas).filter((file) => file.isDirectory())
    let schemas: string[] = []
    for (const file of files) {
      if (!name || (name && file.name === snake(name))) {
        schemas.push(file.name)
      }
    }
    return schemas.length === 0 ? [this.classname] : schemas
  }
}
