import { Command } from 'commander'
import Generator from '../generator'
import Remove from '../remove'
import { IInitializeOptions, ISchemaOptions } from '../options'
import { upperCamel } from '../common'
import chalk = require('chalk')
import Component from '../components'

try {
  const pkg = require('../../package.json')
  const commander = new Command()

  commander
    .version(pkg.version)
    .option('--namespace <namespace>', 'application namespace', 'example')
    .option('--config <filename>', 'application config file name', 'classgen-ts-nuxt.json')
    .option('--sqldump <filename>', 'sql dump file name')
    .option('--dist <path>', 'output directory', './')
    .option('-f, --force', 'forced command')

  /**
   * config系のファイルを先にロードする
   */
  commander.command('config').action(() => {
    if (commander.opts().remove) {
      return new Remove(commander.opts()).config()
    }
    new Generator(commander.opts()).config()
  })

  /**
   * 初期化処理
   */
  commander
    .command('initialize')
    .option('--admin', 'template type admin')
    .option('-a, --auth [model]', 'authenticate flag')
    .action((options: IInitializeOptions) => {
      if (commander.opts().remove) {
        return new Remove(commander.opts()).initialize(options)
      }
      new Generator(commander.opts()).initialize(options)
    })

  /**
   * モデル名から一通りのファイルを作成
   */
  commander
    .command('generate')
    .argument('<command>', 'all | schema | auth | index')
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .option('-e, --excludes <excludes>', 'excludes column with sqldump', (items) => items.split(','))
    .option('-sw, --swagger', 'create with swagger file')
    .option('--all', 'create all schemas using sql dump file')
    .action((command: string, name: string, options: ISchemaOptions) => {
      const generator = new Generator(commander.opts())
      if (command === 'all') {
        if (!name && !options.all) {
          console.log(chalk.red('Error:', 'Please enter a schema name'))
          process.exit()
        }
        generator.generate(upperCamel(name), options)
      } else if (command === 'schema') {
        generator.schema(upperCamel(name), options)
      } else if (command === 'auth') {
        generator.auth(name, options)
      } else if (command === 'index') {
        generator.injector()
      }
    })
  /**
   * モデル名から一通りのファイルを作成
   */
  commander
    .command('remove')
    .argument('<command>', 'all | schema | auth | index')
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .option('-sw, --swagger', 'create with swagger file')
    .option('--all', 'create all schemas using sql dump file')
    .action((command: string, name: string, options: ISchemaOptions) => {
      const remove = new Remove(commander.opts())
      if (command === 'all') {
        remove.generate(upperCamel(name), options)
      } else if (command === 'schema') {
        remove.schema(upperCamel(name), options)
      } else if (command === 'auth') {
        remove.auth(upperCamel(name), options)
      }
    })

  /**
   * 認証ファイルの生成
   */
  commander
    .command('components')
    .argument('<command>', 'pages | forms')
    .action((command: string) => {
      if (command === 'pages') {
      } else if (command === 'forms') {
      }
    })

  commander.parse(process.argv)
} catch (e) {
  console.error(e)
  process.exit(2)
}
