import { Command } from 'commander'
import Generator from '../generator'

try {
  const pkg = require('../../package.json')
  const commander = new Command()

  commander
    .version(pkg.version)
    .option('--namespace <namespace>', 'application namespace')
    .option('-f, --force', 'override output file')
    .option('-r, --remove', 'remove flag')
    .option('-s, --sqldump <file>', 'mysql dump file')
    .option('-d, --dist <dist>', 'output directory')
    .option('-t, --type <type>', 'template type choices (web, admin)')
    .option('-m, --model <model>', 'model name')
    .option('-e, --excludes <excludes>', 'excludes column', (items) => items.split(','))
    .option('--without', 'without paths')
  /**
   * 初期化処理
   */
  commander
    .command('initialize')
    .option('-a, --auth <model>', 'authenticate flag')
    .action((options: any) => {
      new Generator(commander.opts()).initialize(options)
    })

  /**
   * swaggerからentityなどを作成
   */
  commander.command('schema').action(() => {
    new Generator(commander.opts()).schema()
  })

  /**
   * config系のファイルを先にロードする
   */
  commander.command('config').action(() => {
    new Generator(commander.opts()).settings()
  })

  commander.parse(process.argv)
} catch (e) {
  console.error(e)
  process.exit(2)
}
