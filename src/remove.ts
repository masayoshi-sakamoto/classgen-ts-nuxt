import { IInitializeOptions, IOptions, ISchemaOptions } from './options'
import Base from './base'
import { upperCamel } from './common'

export default class Remove extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  config() {
    this.remove('config', './')
  }
  initialize(options: IInitializeOptions) {
    this.remove('initialize', './')
  }

  generate(name: string, options: ISchemaOptions) {
    this.schema(name, options)
    this.remove('generate', './')
  }

  /**
   * 指定されたモデル名でentity、translatorを削除
   * --swaggerが指定されている場合はスキーマも削除
   *
   * @param name
   * @param options
   */
  schema(name: string, options: ISchemaOptions) {
    this.parameter.model = name

    const files = this.findSchema(name)
    if (files) {
      for (const file of files) {
        const model = file.split('.')[0]
        this.parameter.model = name + (model === 'index' ? '' : upperCamel(model))
        this.remove('schema', './app/infrastructure')
      }
      this.parameter.model = name
      this.remove('schema', './app/entities')
      this.remove('schema', './app/gateways')
    }
    // スキーマファイルを削除
    if (options.swagger) {
      this.remove('schema', './swagger')
    }

    this.index('swagger')
    this.index('app')
  }

  auth(name: string, options: ISchemaOptions) {
    this.parameter = {
      model: name,
      namespace: this.options.namespace
    }
    this.remove('auth', './')
    this.remove('schema', './')
    this.index('swagger')
    this.models(true)
    this.index('app')
  }
}
