import * as fs from 'fs'
import * as path from 'path'
import * as ejs from 'ejs'
import * as chalk from 'chalk'
import * as YAML from 'js-yaml'
import swagpack from 'swagpack/lib/build'

import { readdir, replace, snake, upperCamel, lowerCamel, mkdir, replaces } from './common'
import { ISchemaOptions, TOptions } from './options'
import OpenAPIParser from './openapi'
import { IConfig, IYAML } from './types'
import SQLParser from './sql'
import { exit } from 'process'
const readlineSync = require('readline-sync')

export default class Base {
  protected src: string
  protected dist: string
  protected parameter: any = {}
  protected paths: any = {}
  protected model?: string
  protected sqldump?: any
  protected configs?: any
  protected swagger: any = {
    paths: {},
    models: []
  }

  constructor(protected options: TOptions) {
    if (!options.namespace) {
      throw new Error('Namespace is required. Please specify with --namespace option.')
    }

    // 変換用のパスを指定
    this.src = path.resolve(__dirname, '../templates/')
    this.dist = path.resolve(process.cwd(), this.options.dist)
    this.parameter = {
      model: 'user', // モデル名が省略差rている場合はuserテールブルを作成する
      namespace: this.options.namespace
    }

    // 設定ファイルを読み込み
    const configpath = path.resolve(process.cwd(), 'classgen-ts-nuxt.json')

    // コンフィグの初期化
    this.configs = { tables: { excludes: [] }, columns: { excludes: [] }, schemas: { excludes: [] } }
    const configs: IConfig = fs.existsSync(configpath) ? JSON.parse(fs.readFileSync(configpath, 'utf-8')) : {}
    this.configs = { ...this.configs, ...configs }

    // 除外したいカラム名を取得
    this.options.excludes = this.options.excludes || []
    this.options.excludes = this.configs.columns!.excludes!.concat(this.options.excludes)

    // SQLファイルが指定されている場合、ファイルを読み込んでくる
    if (this.options.sqldump) {
      if (fs.existsSync(path.resolve(process.cwd(), this.options.sqldump))) {
        this.sqldump = fs.readFileSync(path.resolve(process.cwd(), this.options.sqldump), 'utf-8')
      }
    }
  }

  /**
   * 指定されたフォルダの中をレンダリングする
   */
  protected generator(type: string, dir: string, force: boolean = false) {
    readdir(path.join(this.src, path.join(type, dir)), path.join(this.dist, dir), this.parameter, force, this.render.bind(this))
  }

  /**
   * 指定されたフォルダの中を削除
   */
  protected remove(type: string, dir: string, force: boolean = false) {
    readdir(path.join(this.src, path.join(type, dir)), path.join(this.dist, dir), this.parameter, force, this.rm.bind(this), true)
  }

  /**
   * 指定されたフォルダの中を削除
   */
  protected dump(options: ISchemaOptions, model?: string) {
    this.options = {
      ...this.options,
      ...options
    }
    const yamls = new SQLParser(this.sqldump, this.options).parse(this.configs)
    if (model) {
      const dist = yamls.find((yaml) => upperCamel(yaml.model) === upperCamel(model))
      if (dist) {
        this.schemas(dist)
      }
    } else {
      for (const yaml of yamls) {
        this.schemas(yaml)
      }
    }
  }

  /**
   * SQLでパースされてきたYAMLデータを適切な場所に書き込む
   */
  protected schemas(yaml: IYAML) {
    const fullpath = mkdir(this.dist, path.join('swagger/src/components/schemas', snake(yaml.model)))
    this.write(path.resolve(fullpath, 'index.yaml'), yaml.index, false)
    this.write(path.resolve(fullpath, 'seed.yaml'), yaml.seed, false)
    const origin = this.parameter.model
    this.parameter.model = upperCamel(yaml.model)
    this.generator('generate', './swagger')
    this.parameter.model = origin
  }

  /**
   * schemaのモデルをswagger.ymlにある分だけ全部作成する
   */
  protected models(remove: boolean = false) {
    const origin = this.parameter.model
    for (const model of this.swagger.models) {
      this.parameter.model = model.name
      this.generator('models', './app')
    }
    this.parameter.model = origin
  }

  /**
   * 生成されたファイルから一覧を表示する系のファイルを作成する
   */
  protected async index(type: string) {
    const types: { [key: string]: string[] } = {
      swagger: ['src/paths', 'src/components/schemas'],
      app: ['gateways/AppName', 'gateways', 'repositories', 'plugins', 'store', 'types', 'infrastructure/network/AppName/schema']
    }

    // typesで指定されたフォルダの中にあるファイルの内容をもとにファイルを生成
    // typesはdistで指定された先のフォルダの中身を見る
    for (const dir of types[type]) {
      const src = path.join(type, dir) // 読み込み先のパスを生成
      const dist = mkdir(this.dist, replaces(src, this.parameter)) // 書き込み先のパスを生成
      const files = fs.readdirSync(dist, { withFileTypes: true })

      let paths: {
        dirs: { name: string; files: string[] }[]
        files: string[]
      } = { dirs: [], files: [] }

      for (const file of files) {
        if (file.isDirectory()) {
          paths.dirs.push({ name: file.name, files: fs.readdirSync(path.join(dist, file.name)) })
        } else {
          paths.files.push(file.name)
        }
      }

      // typesで指定されたパスのディレクトリ情報をejsにわたすために保存
      this.paths[dir] = paths
      this.generator('index', src, true)
    }

    // swaggerが更新される時はswaggerファイルを生成
    if (type === 'swagger') {
      const src = path.resolve(mkdir(this.dist, 'swagger/src'), 'index.yaml')
      const dist = path.resolve(mkdir(this.dist, 'swagger'), 'swagger.yaml')
      if (fs.existsSync(src)) {
        await new Promise((resolve) => {
          resolve(swagpack(src, dist))
        })
        this.swagger = new OpenAPIParser(YAML.load(fs.readFileSync(dist, 'utf-8')) as any).parse()
      } else {
        console.log(chalk.red('Error:'), 'File not found', src)
        console.log(chalk.green('Noite:'), 'Run the initialize command')
        exit()
      }
    }
  }

  /**
   * EJSを使ってテンプレートファイルからファイルを生成
   */
  protected render(src: string, dist: string, force: boolean) {
    const options = {
      ...replace(this.parameter),
      snake,
      upperCamel,
      lowerCamel,
      paths: this.paths,
      swagger: this.swagger,
      auth: false
    }
    const content = ejs.render(fs.readFileSync(src, 'utf-8'), options)
    this.write(dist, content, force)
  }

  /**
   * 生成されたファイルの書き込み
   */
  protected write(filepath: string, content: string, force: boolean) {
    const exist = fs.existsSync(filepath)

    if (force) {
      fs.writeFileSync(filepath, content, { encoding: 'utf-8', flag: 'w+' })
    } else if (!exist || this.options.force) {
      fs.writeFileSync(filepath, content, { encoding: 'utf-8', flag: 'w+' })
      const msg = this.options.force && exist ? chalk.yellow(' Override:') : chalk.green(' Generated:')
      console.log(msg, filepath.replace(RegExp(`${this.dist}`), ''))
    }
  }

  /**
   * 生成されたファイルの削除
   */
  protected rm(src: string, dist: string, force: boolean) {
    if (fs.existsSync(dist)) {
      const name = dist.replace(RegExp(`${this.dist}`), '')
      if (!this.options.force) {
        if (readlineSync.keyInYN(`${chalk.red('remove')} ${name}?`) !== true) {
          return
        }
      }
      fs.rmSync(dist)
      if (this.options.force) {
        console.log(chalk.red('removed:'), name)
      }
    }
  }

  /**
   * Schemaファイルの中に指定されたモデルが有るかをチェック
   */
  protected findSchema(name: string) {
    const fullpath = path.resolve(this.dist, 'swagger/src/components/schemas')
    if (fs.existsSync(fullpath)) {
      const find = fs.readdirSync(fullpath, { withFileTypes: true }).find((file) => file.isDirectory() && file.name === snake(name))
      if (find) {
        return fs.readdirSync(path.join(fullpath, find.name))
      }
    }
    return undefined
  }
}
