import { Command } from 'commander'
import Generator from '../generator'
import Component from '../components'
import Swagger from '../swagger'
import { IGenerateOptions } from '../options'
import { error } from '../common'
import chalk = require('chalk')

const readlineSync = require('readline-sync')

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
    .option('-rm, --remove', 'forced command')
    .option('-i, --info', 'displays a confirmation message')

  /**
   * swaggerファイルの生成
   */
  commander
    .command('swagger')
    .alias('swg')
    .argument('<command>', 'all|schema|path|auth|csv|sql|index')
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .option('-e, --excludes <excludes>', 'excludes column with sqldump', (items) => items.split(','))
    .action(async (command: string, name: string, options: IGenerateOptions) => {
      if (!command.match(/^(all|schema|path|auth|csv|sql|index)$/)) {
        error('command must be one of all|schema|path|auth|csv|sql|index|')
      }
      const swagger: any = new Swagger({ ...options, global: { ...commander.opts() } })
      await swagger[command](name)
    })

  /**
   * モデル名から一通りのファイルを作成
   */
  commander
    .command('generate')
    .alias('gen')
    .argument('<command>', 'usecase|schema|auth|csv|index|config|initialize')
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .argument('[type]', 'gateway connection type. only usecase')
    .option('-e, --excludes <excludes>', 'excludes column with sqldump', (items) => items.split(','))
    .option('-sw, --swagger', 'create with swagger file')
    .option('-a, --auth', 'added authentication process')
    .action(async (command: string, name: string, type: string, options: IGenerateOptions) => {
      if (!command.match(/^(usecase|schema|auth|csv|index|config|initialize)$/)) {
        error('command must be one of usecase|schema|auth|csv|index|config|initialize')
      }

      if (
        !name &&
        !commander.opts().force &&
        command === 'schema' &&
        readlineSync.keyInYN(`${chalk.yellow('Warning:')} generate all defined schemas?`) !== true
      ) {
        return
      }

      if (command === 'auth') {
        options.auth = true
      }

      if (options.swagger && command.match(/^(usecase|schema|auth|csv|index)$/)) {
        const swagger: any = new Swagger({ ...options, global: { ...commander.opts() } })
        await swagger[command === 'schema' || command === 'usecase' ? 'all' : command](name)
        if (command !== 'index' && commander.opts().sqldump) {
          await swagger.sql(name)
        }
      }

      const generator: any = new Generator({ ...options, global: { ...commander.opts() } })
      await generator[command](name, type)
    })

  /**
   * モデル名から一通りのファイルを作成
   */
  commander
    .command('component')
    .alias('com')
    .argument('<command>', 'page|form|menu|auth|web')
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .action(async (command: string, name: string, options: IGenerateOptions) => {
      if (!command.match(/^(page|form|menu|auth|web)$/)) {
        error('command must be one of page|form|menu|auth|web')
      }
      const component: any = new Component({ ...options, global: { ...commander.opts() } })
      await component[command](name)
    })

  commander.parse(process.argv)
} catch (e) {
  console.error(e)
  process.exit(2)
}
