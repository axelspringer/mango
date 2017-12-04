import * as argv from 'yargs'
import * as process from 'process'

export function parseArgs() {
  return argv
    .usage('Usage: $0 [options]')
    .options('endpoint', {
      string: true,
      alias: 'e',
      default: process.env.MANGO_ENDPOINT || '',
      desc: 'WordPress API Endpoint'
    })
    .options('port', {
      string: true,
      alias: 'p',
      default: process.env.PORT || '8080',
      desc: 'Port'
    })
    .options('host', {
      string: true,
      alias: 'h',
      default: process.env.HOST || 'localhost',
      desc: 'Host'
    })
    .version(require('../package.json').version)
    .alias('version', 'v')
    .help('help')
    .alias('help', 'h')
    .argv
}
