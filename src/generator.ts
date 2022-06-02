import { IInitializeOptions, IOptions, ISchemaOptions } from './options'
import Base from './base'
import chalk = require('chalk')
import { IModel } from './types'
import { upperCamel } from './common'
import { exit } from 'process'

export default class Generator extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  config() {
    this.generator('config', './')
  }

  async initialize(options: IInitializeOptions) {
    this.generator('initialize', './swagger')
    await this.index('swagger')

    this.generator('initialize', './app')
    await this.injector()
  }

  async auth(name: string, options: ISchemaOptions) {
    this.parameter.model = name

    // アカウント系は強制にスキーマを作成
    this.generator('auth', './swagger')
    await this.index('swagger')

    new Array('Account', 'Auth').forEach((schema) => {
      const files = this.findSchema(schema)
      if (files) {
        for (const file of files) {
          const model = file.split('.')[0]
          this.parameter.model = schema + (model === 'index' ? '' : upperCamel(model))
          this.generator('schema', './app/infrastructure')
        }
        this.parameter.model = schema
        this.generator('schema', './app/entities')
        this.generator('schema', './app/gateways')
      }
    })

    this.parameter.model = name

    // app系のファイルは強制的に作成
    this.generator('auth', './app')

    // ログイン用のスキーマを作成
    this.schema(name, options)
    this.generator('generate', './')
    await this.injector()
  }

  /**
   * 指定されたモデル名でentity、translator、schemaファイルを更新
   * swaggerファイルがない場合はエラー
   *
   * @param name
   * @param options
   */
  async schema(name: string, options: ISchemaOptions) {
    this.parameter.model = name

    // ベースのスキーマファイルを作成
    // dumpファイルが指定されている場合は自動的にdump内容から生成
    if (options.swagger) {
      this.generator('schema', './swagger')
    } else if (this.sqldump) {
      this.dump(options, name)
    }

    // スキーマファイルが更新されている可能性があるのでswagger.yamlを再生成
    await this.index('swagger')
    const files = this.findSchema(name)
    if (files) {
      for (const file of files) {
        const model = file.split('.')[0]
        this.parameter.model = name + (model === 'index' ? '' : upperCamel(model))
        this.generator('schema', './app/infrastructure')
      }
      this.parameter.model = name
      this.generator('schema', './app/entities')
      this.generator('schema', './app/gateways')
    } else {
      console.log(chalk.red('error'), 'No schema file, please run with --swagger option.')
      exit
    }
    await this.injector()
  }

  /**
   * 指定されたモデル名でentity、translator、schemaファイルを更新
   * swaggerファイルがない場合はエラー
   *
   * @param name
   * @param options
   */
  async generate(name: string, options: ISchemaOptions) {
    this.parameter.model = name
    this.schema(name, options)
    this.generator('generate', './')
    await this.injector()
  }

  async injector() {
    await this.index('swagger')
    this.models()
    await this.index('app')
  }
}
