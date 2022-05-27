import * as fs from 'fs'
import * as path from 'path'
import * as ejs from 'ejs'

export interface Options {
  namespace: string
  dist: string
  type: string
}

export default class Generator {
  private root: string

  constructor(protected options: Options) {
    if (!options.namespace) {
      throw new Error('Namespace is required. Please specify with --namespace option.')
    }

    this.root = path.resolve(__dirname, '../templates/')
    options.dist = options.dist ? path.resolve(__dirname, '../' + options.dist + '/') : './'
    this.makeDir('./', 'app')
    this.makeDir('./', 'swagger')
  }

  initialize() {
    console.log('initialize')
  }

  swagger() {
    console.log('swagger')
  }

  private makeDir(src: string, filename: string) {
    if (!fs.existsSync(this.options.dist)) {
      fs.mkdirSync(this.options.dist)
    }
    const dir = path.resolve(this.options.dist, path.join(src, filename))
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    return dir
  }
}
