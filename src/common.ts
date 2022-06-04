import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk'
import Inflector from './lib/inflector'
import { toCamelCase, toKebabCase, toUnderscoreCase } from './lib/snake-camel'

const inflector = new Inflector()

export function error(msg: string) {
  console.info(chalk.red('error'), msg)
  process.exit()
}

export function replaces(filename: string, replace: any) {
  return Object.entries(replace)
    .reduce((name, [key, prop]) => {
      return name.replace(RegExp(`(.*)${key}(.*)`), '$1' + prop + '$2')
    }, filename)
    .replace(/(.*).ejsx$/, '$1')
    .replace(/(.*).ejs$/, '$1')
}

/**
 * srcに拡張子があるならファイルとしてパスを返却
 * そうでなければディレクトリを生成
 */
export function resolve(...args: string[]) {
  const file = args[args.length - 1].match(/^(.*)\.(.+)$/) ? args.pop()! : ''
  const dist = path.resolve(...args)
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist, { recursive: true })
  }
  return path.resolve(dist, file)
}

export function snake(name: string, pluralize: boolean = false) {
  if (name) {
    const word = inflector.singularize(toUnderscoreCase(name))
    return pluralize ? inflector.pluralize(word) : word
  }
  return name
}

export function kabab(name: string, pluralize: boolean = false) {
  if (name) {
    const word = inflector.singularize(toKebabCase(name))
    return pluralize ? inflector.pluralize(word) : word
  }
  return name
}

export function upperCamel(name: string, pluralize: boolean = false) {
  if (name) {
    const word = pluralize ? inflector.pluralize(name) : name
    return toCamelCase(toUnderscoreCase(word))
  }
  return name
}

export function lowerCamel(name: string, pluralize: boolean = false) {
  if (name) {
    const word = pluralize ? inflector.pluralize(name) : name
    return toCamelCase(toUnderscoreCase(word), false)
  }
  return name
}
