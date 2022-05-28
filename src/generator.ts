import * as fs from 'fs'
import * as path from 'path'
import * as ejs from 'ejs'

const inflector = require('./lib/inflector')
const rimraf = require('rimraf')

export interface Options {
  namespace: string
  dist: string
  type: string
  force: boolean
}

export default class Generator {
  private root: string
  private _app: string = 'app'
  private _swagger: string = 'swagger'
  private className: string = 'Model'
  private classNames: string = 'Models'
  private classname: string = 'model'
  private opts: any

  constructor(protected options: Options) {
    if (!options.namespace) {
      throw new Error('Namespace is required. Please specify with --namespace option.')
    }

    if (options.force) {
    }

    this.root = path.resolve(__dirname, '../templates/')
    options.dist = options.dist ? path.resolve(options.dist + '/') : './'
    this.makeDir('./', this._app)
    this.makeDir('./', this._swagger)
  }

  initialize() {
    console.log('initialize')
    this.generator('initialize')
  }

  swagger() {
    console.log('swagger')
  }

  entity(model: string) {
    console.log('entity')
    this.model(model)
    this.generator('entity')
  }

  private model(model: string) {
    this.className = model
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
    this.opts = {
      appName: this.options.namespace,
      className: this.className,
      classNames: this.classNames,
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
    fs.writeFileSync(filepath, content, { encoding: 'utf-8', flag: 'w+' })
    console.log('Generated:', filepath)
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
}
