import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk'
import Inflector from './lib/inflector'
import { toCamelCase, toUnderscoreCase } from './lib/snake-camel'

const inflector = new Inflector()

/**
 * 各フォルダの階層をおって生成するよう再帰的にフォルダの読み込みを行っている
 */
export function readdir(src: string, dist: string, options: { model: string; namespace: string }, force: boolean, callback: Function, remove?: boolean) {
  if (!fs.existsSync(src)) {
    return
  }
  const files = fs.readdirSync(src, { withFileTypes: true })

  for (const file of files) {
    // 名前の置換
    const filename = replaces(file.name, options)
    dist = replaces(dist, options)
    if (file.isDirectory()) {
      const dir = mkdir(dist, filename)
      readdir(path.join(src, file.name), dir, options, force, callback, remove)
      if (remove && fs.readdirSync(dir).length === 0) {
        fs.rmdirSync(dir)
      }
    } else {
      callback(path.join(src, file.name), path.join(dist, filename), force)
    }
  }
}

export function replaces(filename: string, options: { model: string; namespace: string }) {
  return Object.entries(replace(options))
    .reduce((name, [key, prop]) => {
      return name.replace(RegExp(`(.*)${key}(.*)`), '$1' + prop + '$2')
    }, filename)
    .replace(/(.*).ejsx$/, '$1')
    .replace(/(.*).ejs$/, '$1')
}

/**
 * ディレクトリが存在しないエラーを起こさないための関数
 * parentに指定されたディレクトリの下にsrcで指定されたフォルダを作成
 * すでにある場合はなにもしない
 * 作成されたディレクトリパスを返す
 */
export function mkdir(parent: string, src: string) {
  const dist = path.resolve(parent, src)
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist, { recursive: true })
  }
  return dist
}

/**
 * 名前の変換
 */
export function replace(options: { model: string; namespace: string }) {
  return {
    appname: snake(options.namespace),
    AppName: upperCamel(options.namespace),
    classname: snake(options.model),
    classnames: snake(options.model, true),
    ClassName: upperCamel(options.model),
    ClassNames: upperCamel(options.model, true),
    className: lowerCamel(options.model),
    classNames: lowerCamel(options.model, true)
  }
}

export function snake(name: string, pluralize: boolean = false) {
  const word = inflector.singularize(toUnderscoreCase(name))
  return pluralize ? inflector.pluralize(word) : word
}

export function upperCamel(name: string, pluralize: boolean = false) {
  return toCamelCase(snake(name, pluralize))
}

export function lowerCamel(name: string, pluralize: boolean = false) {
  return toCamelCase(snake(name, pluralize), false)
}
