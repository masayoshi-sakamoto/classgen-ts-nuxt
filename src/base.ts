import * as fs from 'fs'
import * as path from 'path'
import * as ejs from 'ejs'
import * as chalk from 'chalk'
import * as YAML from 'js-yaml'
import * as prettier from 'prettier'
import swagpack from 'swagpack/lib/build'

import { snake, kabab, upperCamel, lowerCamel, resolve, replaces, error } from './common'
import { IOptions } from './options'
import OpenAPIParser from './openapi'
import { EmptyConfig, IConfig, swagger, app, exts, IModel } from './types'

const readlineSync = require('readline-sync')

export default class Base {
  protected src: string
  protected dist: string
  protected classname: string = 'user'
  protected swagger: { paths: any; models: IModel[] } = { paths: {}, models: [] }
  protected sqldump?: any
  protected configs: IConfig

  constructor(protected opts: IOptions) {
    // ネームスペースがない場合は処理を終了
    if (!this.opts.global.namespace) {
      error('namespace is required. Please specify with --namespace option.')
    }

    // テンプレートの読み込み先と、出力先を設定
    this.src = path.resolve(__dirname, '../templates/')
    this.dist = path.resolve(process.cwd(), this.opts.global.dist)

    resolve(this.dist)

    // 設定ファイルを読み込み
    const configpath = path.resolve(process.cwd(), this.opts.global.config)

    // コンフィグの初期化
    const configs: IConfig = fs.existsSync(configpath) ? JSON.parse(fs.readFileSync(configpath, 'utf-8')) : {}
    this.configs = EmptyConfig(configs)

    // SQLファイルが指定されている場合、ファイルを読み込んでくる
    if (this.opts.global.sqldump) {
      if (fs.existsSync(path.resolve(process.cwd(), this.opts.global.sqldump))) {
        this.sqldump = fs.readFileSync(path.resolve(process.cwd(), this.opts.global.sqldump), 'utf-8')
      }
    }
  }

  /**
   * 削除フラグがあったら削除、なければ作成
   */
  protected async update(src: string, dist: string) {
    if (this.opts.global.remove) {
      await this.remove(src, dist)
    } else {
      await this.generate(src, dist)
    }
  }

  /**
   * 指定されたフォルダの中をレンダリングする
   */
  protected async generate(src: string, dist: string, silent: boolean = false) {
    await this.readdir(path.join(this.src, src), path.join(this.dist, dist), 'render', silent)
  }

  /**
   * 指定されたフォルダの中を削除
   */
  protected async remove(src: string, dist: string, silent: boolean = false) {
    await this.readdir(path.join(this.src, src), path.join(this.dist, dist), 'rm', silent)
  }

  /**
   * 指定されたsrcに基づいて、distにディレクトリとファイルを生成と削除
   * methodを指定することで、そのファイルに対してなにをするかを指定出来る
   */
  protected async readdir(src: string, dist: string, method: string, silent: boolean = false) {
    if (fs.existsSync(src)) {
      const files = fs.readdirSync(src, { withFileTypes: true })
      dist = replaces(dist, this.replace())
      for (const file of files) {
        const name = resolve(dist, replaces(file.name, this.replace()))
        if (file.isDirectory()) {
          await this.readdir(path.join(src, file.name), name, method, silent)
          if (method === 'rm' && fs.readdirSync(name).length === 0) {
            fs.rmdirSync(name)
          }
        } else {
          await (this as any)[method](path.join(src, file.name), name, silent)
        }
      }
    }
  }

  /**
   * EJSを使ってテンプレートファイルからファイルを生成
   */
  protected async render(src: string, dist: string, silent: boolean = false) {
    const opts = {
      ...this.replace(),
      swagger,
      app,
      readfiles: this.readfiles.bind(this),
      ...this.swagger,
      auth: this.opts.auth,
      snake,
      kabab,
      upperCamel,
      lowerCamel
    }
    await this.write(dist, ejs.render(fs.readFileSync(src, 'utf-8'), opts), silent)
  }

  /**
   * 生成されたファイルの書き込み
   */
  protected async write(dist: string, content: string, silent: boolean) {
    const exist = fs.existsSync(dist) // 書き出し先が存在しているか
    const ext = path.extname(dist).replace('.', '')

    const text = exts.includes(ext)
      ? prettier.format(content, {
          parser: ext === 'ts' ? 'typescript' : ext,
          ...(await prettier.resolveConfig(process.cwd()))
        })
      : content

    const name = dist.replace(RegExp(`${this.dist}\/`), '')

    if (
      !silent &&
      exist &&
      !this.opts.global.force &&
      readlineSync.keyInYN(`${chalk.yellow('override')} ${name}?`) !== true
    ) {
      return
    }
    fs.writeFileSync(dist, text, { encoding: 'utf-8', flag: 'w+' })
    if (!silent) {
      const msg = exist && this.opts.global.force ? chalk.yellow('Override:') : chalk.green('Generated:')
      console.info(msg, name)
    }
  }

  /**
   * 生成されたファイルの削除
   */
  protected async rm(src: string, dist: string, silent: boolean = false) {
    if (fs.existsSync(dist)) {
      const name = dist.replace(RegExp(`${this.dist}\/`), '')
      if (!this.opts.global.force && readlineSync.keyInYN(`${chalk.red('remove')} ${name}?`) !== true) {
        return
      }
      fs.rmSync(dist)
      if (!silent && this.opts.global.force) {
        console.info(chalk.red('Removed:'), name)
      }
    }
  }
  /**
   * 名前の変換
   */
  protected replace() {
    return {
      appName: lowerCamel(this.opts.global.namespace),
      AppName: upperCamel(this.opts.global.namespace),
      'class-name': kabab(this.classname),
      class_name: snake(this.classname),
      class_names: snake(this.classname, true),
      className: lowerCamel(this.classname),
      classNames: lowerCamel(this.classname, true),
      ClassName: upperCamel(this.classname),
      ClassNames: upperCamel(this.classname, true)
    }
  }

  /**
   * 指定されたフォルダのファイルリストを取得する
   */
  protected readfiles(src: string, dir: string = '') {
    const name = resolve(this.dist, replaces(src, this.replace()), dir)
    return fs.readdirSync(name, { withFileTypes: true })
  }

  /**
   * swagger.yamlからschemaとパス情報を取得
   */
  protected load(): { paths: any; models: IModel[] } {
    const dist = resolve(this.dist, 'swagger/swagger.yaml')
    if (fs.existsSync(dist)) {
      return new OpenAPIParser(YAML.load(fs.readFileSync(dist, 'utf-8')) as any).parse()
    }
    error('not swagger/swagger.yaml')
    process.exit()
  }

  protected async swagpack() {
    const src = resolve(this.dist, 'swagger/src/index.yaml')
    const dist = resolve(this.dist, 'swagger/swagger.yaml')
    if (fs.existsSync(src)) {
      await new Promise((resolve) => {
        resolve(swagpack(src, dist))
      })
    } else {
      error('file not found.')
    }
  }
}
