import * as fs from 'fs'
import * as path from 'path'

import { IOptions } from './options'
import Base from './base'
import { swagger } from './types'
import { error, resolve, snake } from './common'
import SQLParser from './sql'

/**
 * create-nuxt.shを作成
 */
export default class Initialize extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  async start() {
    await this.update('start', './')
  }

  async config() {
    await this.update('config', './')
  }

  async first() {
    await this.update('first', './')
  }

  async static() {
    await this.update('static', './')
  }

  async all() {
    await this.config()
    await this.first()
    await this.static()
  }
}
