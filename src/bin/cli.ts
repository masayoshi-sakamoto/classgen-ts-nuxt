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

  /**
   * swaggerファイルの生成
   */
  commander
    .command('swagger')
    .alias('swg')
    .argument('<command>', 'all|schema|path|auth|sql|index')
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .option('-e, --excludes <excludes>', 'excludes column with sqldump', (items) => items.split(','))
    .action(async (command: string, name: string, options: IGenerateOptions) => {
      if (!command.match(/^(all|schema|path|auth|sql|index)$/)) {
        error('command must be one of all|schema|path|auth|sql|index|')
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
    .argument('<command>', 'schema|auth|index|config|initialize')
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .option('-e, --excludes <excludes>', 'excludes column with sqldump', (items) => items.split(','))
    .option('-sw, --swagger', 'create with swagger file')
    .option('-a, --auth', 'create all schemas using sql dump file')
    .action(async (command: string, name: string, options: IGenerateOptions) => {
      if (!command.match(/^(schema|auth|index|config|initialize)$/)) {
        error('command must be one of schema|auth|index|config|initialize')
      }

      if (
        !name &&
        !commander.opts().force &&
        command === 'schema' &&
        readlineSync.keyInYN(`${chalk.yellow('Warning:')} generate all defined schemas?`) !== true
      ) {
        return
      }

      if (options.swagger && command.match(/^(schema|auth|index)$/)) {
        const swagger: any = new Swagger({ ...options, global: { ...commander.opts() } })
        await swagger[command === 'schema' ? 'all' : command](name)
        if (command === 'schema' && commander.opts().sqldump) {
          await swagger.sql(name)
        }
      }

      const generator: any = new Generator({ ...options, global: { ...commander.opts() } })
      await generator[command](name)
    })

  /**
   * モデル名から一通りのファイルを作成
   */
  commander
    .command('component')
    .alias('com')
    .argument('<command>', 'form|auth')
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .action(async (command: string, name: string, options: IGenerateOptions) => {
      if (!command.match(/^(form|auth)$/)) {
        error('command must be one of form|auth')
      }
      const component: any = new Component({ ...options, global: { ...commander.opts() } })
      await component[command](name)
    })

  commander.parse(process.argv)
} catch (e) {
  console.error(e)
  process.exit(2)
}
