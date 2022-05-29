import * as fs from 'fs'
import * as path from 'path'
import * as ejs from 'ejs'
import * as chalk from 'chalk'
import * as YAML from 'js-yaml'
import swagpack from 'swagpack/lib/build'

import { toCamelCase } from './lib/snake-camel'
import SQLParser from './sql'
import OpenAPIParser from './openapi'

import Inflector from './lib/inflector'
const inflector = new Inflector()
const rimraf = require('rimraf')

export interface Options {
  namespace: string
  force?: boolean
  schema?: string
  dist: string
  type?: string
  model?: string
  excludes?: string[]
  without?: boolean
  injector?: boolean
}

export default class Generator {
  private root: string
  private _app: string = 'app'
  private _swagger: string = 'swagger'
  private className: string = 'User'
  private classNames: string = 'Users'
  private classname: string = 'user'
  private opts: any = {}
  private sqldump: any | null
  private config: any = {}
  private models: {
    [key: string]: {
      name: string
      models: string
      refs: any[]
      schema: any
      seed: boolean
    }
  } = {}

  constructor(protected options: Options) {
    if (!options.namespace) {
      throw new Error('Namespace is required. Please specify with --namespace option.')
    }

    if (this.options.schema) {
      this.options.model = this.options.model || undefined
    } else {
      this.options.model = this.options.model || 'usee'
    }

    this.options.model = this.options.model ? inflector.pluralize(this.options.model.toLowerCase()) : undefined

    const configpath = path.resolve(process.cwd(), 'classgen-ts-nuxt.json')
    this.config = fs.existsSync(configpath) ? JSON.parse(fs.readFileSync(configpath, 'utf-8')) : {}

    if (options.schema) {
      const schema = fs.existsSync(path.resolve(process.cwd(), options.schema))
      this.sqldump = schema ? fs.readFileSync(path.resolve(process.cwd(), options.schema), 'utf-8') : null
    }

    this.options.injector = false
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
    for (const model of Object.values(this.models)) {
      this.opts = {
        ...this.opts,
        schema: model.schema,
        refs: model.refs,
        classes: this.models
      }
      this.model(model.name, false)
      console.log('typegen:', chalk.yellow(model.name))
      this.generator('typegen')
      if (model.models === this.options.model || !this.options.model) {
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

  private dump() {
    if (this.sqldump) {
      const yamls = new SQLParser(this.sqldump, this.options).parse(this.config)
      for (const yaml of yamls) {
        this.swagger(yaml)
      }
    } else {
      console.log('swagger:', chalk.cyan(this.options.model!))
      this.model(this.options.model!)
      this.generator('swagger')
    }
    this.injector()
    this.swagpack()
  }

  private swagger(yaml: any) {
    console.log('swagger:', chalk.cyan.bold(yaml.name))
    const schemas = this.makeDir(this.makeDir(this.makeDir(this.makeDir(this._swagger, 'src'), 'components'), 'schemas'), yaml.name)
    console.log('-', 'schemas')
    this.write(path.resolve(schemas, 'index.yaml'), yaml.index)
    this.write(path.resolve(schemas, 'seed.yaml'), yaml.seed)
    if (!this.options.without) {
      this.model(yaml.name)
      this.generator('paths')
    }
  }

  private injector() {
    this.options.injector = true
    this.generator('injector')
    this.options.injector = false
  }

  private swagpack() {
    const src = path.resolve(this.makeDir(this._swagger, 'src'), 'index.yaml')
    const dist = path.resolve(this.makeDir('./', this._swagger), 'swagger.yaml')
    swagpack(src, dist)
    this.models = new OpenAPIParser(YAML.load(fs.readFileSync(dist, 'utf-8')) as any).parse()
  }

  private model(model: string, toCame: boolean = true) {
    this.className = toCame ? toCamelCase(model) : model
    this.classNames = inflector.pluralize(model)
    this.classname = this.className.toLowerCase()
  }

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

  private generator(type: string) {
    if (type !== 'injector') {
      console.log('-', type)
    }
    this.opts = {
      schema: {},
      refs: {},
      ...this.opts,
      appName: this.options.namespace,
      className: this.className,
      classNames: this.classNames,
      classname: this.classname,
      toCamelCase,
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

  private render(base: string, src: string, dist: string) {
    const content = ejs.render(fs.readFileSync(path.resolve(base, src), 'utf-8'), this.opts)
    const filepath = path.resolve(this.options.dist, dist)
    this.write(filepath, content)
  }

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

  private write(filepath: string, content: string) {
    const exist = fs.existsSync(filepath)

    if (!exist || this.options.force || this.options.injector) {
      fs.writeFileSync(filepath, content, { encoding: 'utf-8', flag: 'w+' })
      if (!this.options.injector) {
        const msg = this.options.force && exist ? chalk.red(' Override:') : chalk.green(' Generated:')
        console.log(msg, filepath)
      }
    }
  }
}
