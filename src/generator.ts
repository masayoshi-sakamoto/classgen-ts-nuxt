import * as fs from 'fs'
import * as path from 'path'
import * as ejs from 'ejs'
import * as chalk from 'chalk'
import * as YAML from 'js-yaml'
import swagpack from 'swagpack/lib/build'

import { toCamelCase, toUnderscoreCase } from './lib/snake-camel'
import SQLParser, { IYAML } from './sql'
import OpenAPIParser, { ITsSchema } from './openapi'

import Inflector from './lib/inflector'
const inflector = new Inflector()
const rimraf = require('rimraf')

export interface IOptions {
  namespace: string // アプリケーション名
  force?: boolean // ファイルの上書きフラグ
  sqldump?: string // SQLDUMPファイル
  dist: string // 出力先
  model?: string // モデル名
  table?: string // テーブル名
  excludes?: string[] // 除外したいカラム名
  without?: boolean
  auth?: string
  type?: string
}

export interface IConfig {
  tables?: {
    excludes?: string[]
  }
  columns?: {
    excludes?: string[]
  }
  schemas?: {
    excludes?: string[]
  }
}

export interface IModel {
  table: string
  name: string
  refs: any
  schema: ITsSchema
  seed: boolean
}

export default class Generator {
  private root: string
  private _app: string = 'app'
  private _swagger: string = 'swagger'
  private className: string = 'User'
  private classNames: string = 'Users'
  private classname: string = 'user'
  private opts: any = {}
  private _injector: boolean = false
  private sqldump: any | null
  private config: IConfig = {}
  private models: IModel[] = []
  private paths: any[] = []

  constructor(protected options: IOptions) {
    if (!options.namespace) {
      throw new Error('Namespace is required. Please specify with --namespace option.')
    }
    // 設定ファイルを読み込み
    const configpath = path.resolve(process.cwd(), 'classgen-ts-nuxt.json')

    // コンフィグの初期化
    this.config = {
      tables: { excludes: [] },
      columns: { excludes: [] },
      schemas: { excludes: [] }
    }
    const config: IConfig = fs.existsSync(configpath) ? JSON.parse(fs.readFileSync(configpath, 'utf-8')) : {}
    this.config = { ...this.config, ...config }

    // SQLファイルが指定されている場合、ファイルを読み込んでくる
    if (this.options.sqldump) {
      this.options.model = this.options.model || undefined
      const schema = fs.existsSync(path.resolve(process.cwd(), this.options.sqldump))
      this.sqldump = schema ? fs.readFileSync(path.resolve(process.cwd(), this.options.sqldump), 'utf-8') : null
    } else {
      // SQLファイルが指定されてない場合は、デフォルトのモデル名をuserにしておく
      this.options.model = this.options.model || 'user'
    }

    // admin Admin admins Adminsをadminに変換
    // キャメルケースの場合はスネークケースに変換
    this.options.model = this.options.model ? inflector.singularize(toUnderscoreCase(this.options.model)) : undefined

    // モデル名からテーブル名を作成
    this.options.table = this.options.model ? inflector.pluralize(this.options.model) : undefined

    // 除外したいカラム名を取得
    this.options.excludes = this.options.excludes || []
    this.options.excludes = this.config.columns!.excludes!.concat(this.options.excludes)

    this._injector = false
    this.options.namespace = toCamelCase(this.options.namespace)
    this.root = path.resolve(__dirname, '../templates/')
    this.options.dist = options.dist ? path.resolve(options.dist + '/') : './'
    this.makeDir('./', this._app)
    this.makeDir('./', this._swagger)
    console.log('application:', chalk.red(this.options.namespace))
  }

  initialize() {
    this.generator('initialize')
    this.schema()
  }

  schema() {
    this.dump()
    for (const model of this.models) {
      const seed = this.models.find((prop) => prop.name === model.name + 'Seed')?.schema
      this.opts = {
        ...this.opts,
        paths: this.paths,
        schemas: model.schema,
        refs: model.refs,
        seed: seed || {},
        classes: this.models
      }
      this.model(model.name)
      // console.log('typegen:', chalk.yellow(model.name))
      this.generator('typegen')
      if (!model.seed && (!this.options.model || model.table === this.options.table)) {
        this.generate(model.name)
      }
    }
    this.injector()
  }

  generate(modelName: string) {
    console.log('model:', chalk.red.bold(modelName))
    this.model(modelName)
    this.generator('entity')
    this.generator('store')
    this.generator('repository')
    this.generator('gateway')
    this.generator('infrastructure')
    this.generator('usecase')
    this.injector()
  }

  /**
   * swagger.ymlを生成する
   */
  private dump() {
    if (this.sqldump) {
      // SQLdumpファイルが有った場合、それをもとにswagger.ymlを生成する
      // -mでモデルが指定されている場合は、そのモデルのみ生成する
      const yamls = new SQLParser(this.sqldump, this.options).parse(this.config)
      for (const yaml of yamls) {
        this.swagger(yaml)
      }
    } else {
      // SQLdumpファイルがないので、デフォルトのSchemaでswagger.ymlを生成する
      console.log('swagger:', chalk.cyan(this.options.model!))
      this.model(this.options.model!)
      this.generator('swagger')
    }
    this.injector()
    this.swagpack()
  }

  /**
   * SQLでパースされてきたYAMLデータを適切な場所に書き込む
   */
  private swagger(yaml: IYAML) {
    console.log('swagger:', chalk.cyan.bold(yaml.model))
    const schemas = this.makeDir(this.makeDir(this.makeDir(this.makeDir(this._swagger, 'src'), 'components'), 'schemas'), yaml.model)
    console.log('-', 'schemas')
    this.write(path.resolve(schemas, 'index.yaml'), yaml.index)
    this.write(path.resolve(schemas, 'seed.yaml'), yaml.seed)

    // TODO: パスの処理を正しく書き出せるように修正
    if (!this.options.without) {
      this.model(yaml.model)
      this.generator('paths')
    }
  }

  /**
   * 生成されたYAMLファイルをsawagger.yamlに結合する
   * 結合されたファイルをパースしてmodelsの中に保存
   */
  private swagpack() {
    const src = path.resolve(this.makeDir(this._swagger, 'src'), 'index.yaml')
    const dist = path.resolve(this.makeDir('./', this._swagger), 'swagger.yaml')
    swagpack(src, dist)
    const { paths, definitions } = new OpenAPIParser(YAML.load(fs.readFileSync(dist, 'utf-8')) as any).parse(this.config)
    this.paths = paths
    this.models = definitions
  }

  /**
   * 指定されたモデル名がキャメルケースの場合は一度スネークケースにしてから処理
   */
  private model(model: string) {
    this.classname = inflector.singularize(toUnderscoreCase(model))
    this.className = toCamelCase(this.classname)
    this.classNames = inflector.pluralize(this.className)
  }

  /**
   * ディレクトリが存在しないエラーを起こさないための関数
   * srcに指定されたディレクトリの下にdirnameで指定されたフォルダを作成
   * すでにある場合はなにもしない
   * 作成されたディレクトリパスを返す
   */
  private makeDir(src: string, direname?: string) {
    if (!fs.existsSync(this.options.dist)) {
      fs.mkdirSync(this.options.dist)
    }
    const dir = direname ? path.resolve(this.options.dist, path.join(src, direname)) : this.options.dist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    return dir
  }

  /**
   * 生成されたyaml、gateways、などをもとに一覧系ファイルを自動生成する
   */
  private injector() {
    this._injector = true
    this.generator('injector')
    this._injector = false
  }

  /**
   * templatesフォルダ内にあるtypeで指定された名前のフォルダを使ってファイルの生成をする
   * フォルダ内の階層はそのまま再現されて出力される
   * ファイル名、フォルダ名に下記の文字列をしているとそれぞれ置換される
   * appName = アプリケーション名
   * className = Adminのように単数形キャメルケースのクラス名
   * classNames = Adminsのように複数形のキャメルケースクラス名
   * classname = adminの用に単数系のスネークケースクラス名
   * 各プロパティはそれぞれの一覧ファイルを作成するようにファイル名の一覧を取得している
   */
  private generator(type: string) {
    if (type !== 'injector') {
      // console.log('-', type)
    }
    this.opts = {
      schema: {},
      refs: {},
      seed: {},
      paths: [],
      ...this.opts,
      appName: this.options.namespace,
      className: this.className,
      classNames: this.classNames,
      classname: this.classname,
      toCamelCase,
      toUnderscoreCase,
      repositories: fs.readdirSync(this.makeDir(this._app, 'repositories')),
      gateways: fs.readdirSync(this.makeDir(this._app, 'gateways')),
      gatewayFiles: fs.readdirSync(this.makeDir(this.makeDir(this._app, 'gateways'), this.options.namespace)),
      storeFiles: fs.readdirSync(this.makeDir(this._app, 'store')),
      schemasFiles: fs
        .readdirSync(this.makeDir(this.makeDir(this.makeDir(this._swagger, 'src'), 'components'), 'schemas'), { withFileTypes: true })
        .filter((prop: any) => prop.isDirectory())
        .map((prop: any) => {
          return {
            key: prop.name,
            values: fs.readdirSync(
              this.makeDir(this.makeDir(this.makeDir(this.makeDir(this._swagger, 'src'), 'components'), 'schemas'), prop.name)
            )
          }
        }),
      pathsFiles: fs
        .readdirSync(this.makeDir(this.makeDir(this._swagger, 'src'), 'paths'), { withFileTypes: true })
        .filter((prop: any) => prop.isDirectory())
        .map((prop: any) => {
          return {
            key: prop.name,
            values: fs.readdirSync(this.makeDir(this.makeDir(this.makeDir(this._swagger, 'src'), 'paths'), prop.name))
          }
        })
    }
    this.readdir(path.join(this.root, type), './', './')
  }

  /**
   * EJSを使ってテンプレートファイルからファイルを生成
   */
  private render(base: string, src: string, dist: string) {
    const content = ejs.render(fs.readFileSync(path.resolve(base, src), 'utf-8'), this.opts)
    const filepath = path.resolve(this.options.dist, dist)
    this.write(filepath, content)
  }

  /**
   * 各フォルダの階層をおって生成するよう再帰的にフォルダの読み込みを行っている
   */
  private readdir(base: string, src: string, dist: string) {
    const files = fs.readdirSync(path.resolve(base, src), { withFileTypes: true })
    for (const file of files) {
      const name = file.name.split(/(?=\.[^.]+$)/)
      name[0] = name[0].replace(/appName/, this.options.namespace)
      name[0] = name[0].replace(/classNames/, this.classNames)
      name[0] = name[0].replace(/className/, this.className)
      name[0] = name[0].replace(/classname/, this.classname)
      const filename = name.join('')

      if (file.isDirectory()) {
        this.makeDir(dist, filename)
        this.readdir(base, path.join(src, file.name), path.join(dist, filename))
      } else {
        this.render(base, path.join(src, file.name), path.join(dist, filename))
      }
    }
  }

  /**
   * 生成されたファイルの書き込み
   */
  private write(filepath: string, content: string) {
    const exist = fs.existsSync(filepath)

    if (!exist || this.options.force || this._injector) {
      fs.writeFileSync(filepath, content, { encoding: 'utf-8', flag: 'w+' })
      if (!this._injector) {
        const msg = this.options.force && exist ? chalk.red(' Override:') : chalk.green(' Generated:')
        // console.log(msg, filepath)
      }
    }
  }
}
