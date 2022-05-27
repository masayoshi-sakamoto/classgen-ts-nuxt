import * as fs from 'fs'
import * as path from 'path'
import * as YAML from 'js-yaml'
import { Command } from 'commander'
import Generator, { Options } from '../generator'
import { exit } from 'process'

const pkg = require('../../package.json')
const commander = new Command()

commander
  .version(pkg.version)
  .option('--namespace <namespace>', 'application namespace')
  .option('-d, --dist <dist>', 'output directory')
  .option('-t, --type <type>', 'template type choices (web, admin)')
  .option('--auth [model]', 'authenticate flag', 'users')
  .option('-f, --force', 'output directory')

try {
  /**
   * 初期化処理
   */
  commander.command('initialize').action(() => {
    new Generator(commander.opts()).initialize()
  })

  /**
   * swaggerファイルの生成
   */
  commander.command('swagger').action((options: Options) => {
    new Generator(options).swagger()
  })

  commander.parse(process.argv)
} catch (e) {
  console.error(e)
  process.exit(2)
}
