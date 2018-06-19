import * as argv from 'yargs'
import Env from './env'

export default function parseArgs() {
  return argv
    .usage('Usage: $0 [options]')
    .options('env', {
      string: true,
      alias: 'e',
      default: Env.Runtime,
      desc: 'Runtime environment'
    })
    .options('config', {
      string: true,
      alias: 'c',
      default: Env.Config,
      desc: 'Mango config'
    })
    .version(require('../package.json').version)
    .alias('version', 'v')
    .help('help')
    .alias('help', 'h')
    .argv
}
