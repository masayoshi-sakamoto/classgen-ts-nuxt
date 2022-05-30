import { Command } from 'commander'
import Generator from '../generator'

const pkg = require('../../package.json')
const commander = new Command()

commander
  .version(pkg.version)
  .option('--namespace <namespace>', 'application namespace')
  .option('-f, --force', 'override output file')
  .option('-s, --sqldump <file>', 'mysql dump file')
  .option('-d, --dist <dist>', 'output directory')
  .option('-t, --type <type>', 'template type choices (web, admin)')
  .option('--auth [model]', 'authenticate flag', 'users')
  .option('-m, --model <model>', 'model name')
  .option('-e, --excludes <excludes>', 'excludes column', (items) => items.split(','))
  .option('--without', 'without paths')

try {
  /**
   * 初期化処理
   */
  commander.command('initialize').action((options: any) => {
    new Generator(commander.opts()).initialize()
  })

  /**
   * swaggerからentityなどを作成
   */
  commander.command('schema').action((options: any) => {
    new Generator(commander.opts()).schema()
  })

  commander.parse(process.argv)
} catch (e) {
  console.error(e)
  process.exit(2)
}
