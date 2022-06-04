import { IOptions } from './options'
import Base from './base'
import { swagger } from './types'
import { error } from './common'
import SQLParser from './sql'

export default class RmSwagger extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  async all(name?: string) {
    this.classname = name || this.classname
    await this.remove('swagger/schemas', swagger.schemas)
    await this.remove('swagger/paths', swagger.paths)
    await this.generate('swagger/index', swagger.root, true)
    await this.swagpack()
  }

  async schema(name?: string) {
    this.classname = name || this.classname
    await this.remove('swagger/schemas', swagger.schemas)
    await this.generate('swagger/index', swagger.root, true)
    await this.swagpack()
  }

  async path(name?: string) {
    this.classname = name || this.classname
    await this.remove('swagger/paths', swagger.paths)
    await this.generate('swagger/index', swagger.root, true)
    await this.swagpack()
  }

  async auth(name?: string) {
    this.classname = name || this.classname
    await this.remove('swagger/auth', swagger.root)
    await this.generate('swagger/index', swagger.root, true)
    await this.swagpack()
  }

  async sql(name?: string) {
    if (!this.sqldump) {
      error('sqldump is required. Please specify with --sqldump option.')
    }
    this.options.excludes = this.options.excludes || []
    this.options.excludes = this.configs.columns!.excludes!.concat(this.options.excludes)
    const yamls = new SQLParser(this.sqldump, this.options).parse(this.configs!)

    for (const yaml of yamls) {
      if (!name || (name && yaml.class_name === name)) {
        this.classname = yaml.class_name
        await this.remove('swagger/schemas', swagger.schemas)
        await this.remove('swagger/paths', swagger.paths)
      }
    }
    await this.generate('swagger/index', swagger.root, true)
    await this.swagpack()
  }

  async index(name?: string) {
    this.classname = name || this.classname
    await this.remove('swagger/index', swagger.root)
    await this.swagpack()
  }

  // エラーしないようにからの関数を定期
  async config() {}
  async initialize() {}
}
