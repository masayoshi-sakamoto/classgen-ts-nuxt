import { Command } from 'commander'
import Generator from '../generator'
import Remove from '../remove'
import { IInitializeOptions, ISchemaOptions } from '../options'
import { upperCamel } from '../common'
import chalk = require('chalk')
import { exit } from 'process'

try {
  const pkg = require('../../package.json')
  const commander = new Command()

  commander
    .version(pkg.version)
    .option('--namespace <namespace>', 'application namespace', 'example')
    .option('--config <filename>', 'application config file name', 'classgen-ts-nuxt.json')
    .option('--sqldump <filename>', 'sql dump file name')
    .option('--dist <path>', 'output directory', './')
    .option('-r, --remove', 'remove option')
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
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .option('-e, --excludes <excludes>', 'excludes column with sqldump', (items) => items.split(','))
    .option('-sw, --swagger', 'create with swagger file')
    .option('--all', 'create all schemas using sql dump file')
    .action((name, options: ISchemaOptions) => {
      if (!name && !options.all) {
        console.log(chalk.red('Error:', 'Please enter a schema name'))
        exit()
      }

      if (commander.opts().remove) {
        return new Remove(commander.opts()).generate(upperCamel(name), options)
      }
      new Generator(commander.opts()).generate(upperCamel(name), options)
    })

  /**
   * swaggerからentityなどを作成
   */
  commander
    .command('schema')
    .argument('<name>', 'schema name e.g. user, User, users, Users')
    .option('-e, --excludes <excludes>', 'excludes column with sqldump', (items) => items.split(','))
    .option('-sw, --swagger', 'create with swagger file')
    .action((name, options: ISchemaOptions) => {
      name = upperCamel(name)
      if (commander.opts().remove) {
        return new Remove(commander.opts()).schema(name, options)
      }
      new Generator(commander.opts()).schema(name, options)
    })

  /**
   * 認証ファイルの生成
   */
  commander
    .command('auth')
    .argument('<name>', 'auth schema name e.g. admin, Admin, admins Admins')
    .option('-e, --excludes <excludes>', 'excludes column with sqldump', (items) => items.split(','))
    .option('-sw, --swagger', 'create with swagger file')
    .action((name, options: ISchemaOptions) => {
      if (commander.opts().remove) {
        return new Remove(commander.opts()).auth(name, options)
      }
      new Generator(commander.opts()).auth(name, options)
    })

  /**
   * injectorファイルの生成
   */
  commander.command('index').action(() => {
    new Generator(commander.opts()).injector()
  })

  commander.parse(process.argv)
} catch (e) {
  console.error(e)
  process.exit(2)
}
