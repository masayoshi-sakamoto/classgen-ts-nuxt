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

  /**
   * sqlのデータをyamlに変換する処理
   * @param yaml
   */
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
