import * as fs from 'fs'
import { IOptions } from './options'
import Base from './base'
import { app, swagger } from './types'
import { error, upperCamel } from './common'

export default class Generator extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  /**
   * injectorのエイリアス
   */
  async index() {
    await this.injector(false)
  }

  /**
   * gatewaysとinfrastructureの作成、nameがなければ全部作成する
   */
  async usecases(name?: string) {
    this.__swagger()
    this.swagger = this.load()
    const paths: any = Object.entries(this.swagger.paths)

    for (const [model, path] of paths) {
      if (!name || (name && model === upperCamel(name))) {
        this.classname = model
        for (const prop of Object.values(path)) {
          const operationId: string = (prop as any).operationId
          const filename = operationId === 'Post' + model ? 'Save' + model : operationId
          await this.update('app/schemas/usecases/class_name', app.usecases, filename + 'UseCase.ts')
        }
      }
    }
  }

  /**
   * gatewaysとinfrastructureの作成、nameがなければ全部作成する
   */
  async gateways(name?: string) {
    this.__swagger()
    this.swagger = this.load()
    const models = this.schemas()
    for (const model of models) {
      if (!name || (name && model.ClassName === upperCamel(name))) {
        this.classname = model.ClassName
        await this.update('app/schemas/gateways/AppName', app.gateways)
        await this.update('app/schemas/infrastructure', app.infrastructure)
      }
    }
  }

  /**
   * repositoriesとstoreの作成、nameがなければ全部作成する
   */
  async repositories(name?: string) {
    this.__swagger()
    this.swagger = this.load()
    const models = this.schemas()
    for (const model of models) {
      if (!name || (name && model.ClassName === upperCamel(name))) {
        this.classname = model.ClassName
        await this.update('app/schemas/repositories', app.repositories)
        await this.update('app/schemas/store', app.store)
      }
    }
  }

  /**
   * entitiesの作成、nameがなければ全部作成する
   */
  async entities(name?: string) {
    this.__swagger()
    this.swagger = this.load()
    const models = this.schemas()
    for (const model of models) {
      if (!name || (name && model.ClassName === upperCamel(name))) {
        this.classname = model.ClassName
        await this.update('app/schemas/entities', app.entities)
        await this.update('app/schemas/gateways/AppName/translator', app.translator)
      }
    }
  }

  /**
   * swaggerの情報からschema生成する
   */
  private async injector(silent: boolean) {
    this.__swagger()
    this.swagger = this.load()
    for (const model of this.swagger.models) {
      this.classname = model.ClassName
      await this.generate('app/models', app.root, silent)
    }
    await this.generate('app/index', app.root, silent)
  }

  private async __swagger() {
    await this.generate('swagger/index', swagger.root, true)
    await this.swagpack()
  }
}
