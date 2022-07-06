import * as fs from 'fs'
import * as path from 'path'

import { IOptions } from './options'
import Base from './base'
import { swagger } from './types'
import { error, resolve, snake } from './common'
import SQLParser from './sql'

export default class Swagger extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  async all(name?: string) {
    this.classname = name || this.classname
    if (!this.options.global.sqldump) {
      await this.update('swagger/schemas', swagger.schemas)
      await this.update('swagger/paths', swagger.paths)
    }
    await this.generate('swagger/index', swagger.root, true)
    await this.swagpack()
  }

  async schema(name?: string) {
    this.classname = name || this.classname
    if (!this.options.global.sqldump) {
      await this.update('swagger/schemas', swagger.schemas)
    }
    await this.generate('swagger/index', swagger.root, true)
    await this.swagpack()
  }

  async path(name?: string) {
    this.classname = name || this.classname
    if (!this.options.global.sqldump) {
      await this.update('swagger/paths', swagger.paths)
    }
    await this.generate('swagger/index', swagger.root, true)
    await this.swagpack()
  }

  async auth(name?: string) {
    this.classname = name || this.classname
    await this.update('swagger/auth', swagger.root)
    await this.generate('swagger/index', swagger.root, true)
    await this.swagpack()
  }

  async csv(name?: string) {
    this.classname = name || this.classname
    await this.update('swagger/csv', swagger.root)
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
      if (!name || (name && yaml.class_name === snake(name))) {
        this.classname = yaml.class_name
        await this.sqlToYaml(yaml)
      }
    }
    await this.generate('swagger/index', swagger.root, true)
    await this.swagpack()
  }

  async index(name?: string) {
    this.classname = name || this.classname
    await this.update('swagger/index', swagger.root)
    await this.swagpack()
  }

  // エラーしないようにからの関数を定期
  async config() {
    console.info('done config.')
  }
  async initialize() {
    console.info('done initialize.')
  }

  private async sqlToYaml(yaml: any) {
    for (const name of ['index', 'seed']) {
      const dist = resolve(this.dist, swagger.schemas, yaml.class_name)
      if (this.opts.global.remove) {
        await this.rm('', path.join(dist, name + '.yaml'))
      } else {
        await this.write(path.join(dist, name + '.yaml'), yaml[name], false)
      }
    }
    for (const name of ['path', 'paths']) {
      const dist = resolve(this.dist, swagger.paths, yaml.class_name)
      if (this.opts.global.remove) {
        await this.rm('', path.join(dist, name + '.yaml'))
      } else {
        await this.write(path.join(dist, name + '.yaml'), yaml[name], false)
      }
    }
  }
}
