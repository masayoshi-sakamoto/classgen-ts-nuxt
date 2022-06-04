import { Command } from 'commander'
import Generator from '../generator'
import Remove from '../remove'
import { IGenerateOptions } from '../options'
import { error, upperCamel } from '../common'
import chalk = require('chalk')
import Component from '../components'
import Swagger from '../swagger'
import RmSwagger from '../rm_swagger'

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
    .argument('<command>', 'all|schema|usecase|auth|index|config|initialize')
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .option('-e, --excludes <excludes>', 'excludes column with sqldump', (items) => items.split(','))
    .option('-sw, --swagger', 'create with swagger file')
    .option('-a, --auth', 'create all schemas using sql dump file')
    .action(async (command: string, name: string, options: IGenerateOptions) => {
      if (!command.match(/^(all|schema|usecase|auth|index|config|initialize)$/)) {
        error('command must be one of all|schema|usecase|auth|index|config|initialize')
      }

      if (options.swagger) {
        const swagger: any = new Swagger({ ...options, global: { ...commander.opts() } })
        await swagger[command === 'usecase' ? 'path' : command](name)
      }

      if (commander.opts().sqldump) {
        const swagger: any = new Swagger({ ...options, global: { ...commander.opts() } })
        await swagger.sql(name)
      }

      const generator: any = new Generator({ ...options, global: { ...commander.opts() } })
      await generator[command](name)
    })

  /**
   * ファイルの削除
   */
  commander
    .command('remove')
    .alias('rm')
    .argument('<command>', 'all|schema|usecase|auth|index|config|initialize|sql')
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .option('-sw, --swagger', 'create with swagger file')
    .action(async (command: string, name: string, options: IGenerateOptions) => {
      if (!command.match(/^(all|schema|usecase|auth|index|config|initialize|sql)$/)) {
        error('command must be one of all|schema|usecase|auth|index|config|initialize|sql')
      }

      if (options.swagger) {
        const swagger: any = new RmSwagger({ ...options, global: { ...commander.opts() } })
        await swagger[command === 'usecase' ? 'path' : command](name)
      }

      const remove: any = new Remove({ ...options, global: { ...commander.opts() } })
      await remove[command](name)
    })

  commander.parse(process.argv)
} catch (e) {
  console.error(e)
  process.exit(2)
}
