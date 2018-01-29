import * as argv from 'yargs'
import * as process from 'process'

export function parseArgs() {
  return argv
    .usage('Usage: $0 [options]')
    .options('wp', {
      string: true,
      alias: 'w',
      default: process.env.MANGO_WP || '',
      desc: 'WordPress API Endpoint'
    })
    .options('mock', {
      boolean: true,
      alias: 'm',
      default: process.env.MANGO_MOCK || false,
      desc: 'Mock WordPress API Endpoints'
    })
    .options('port', {
      string: true,
      alias: 'p',
      default: process.env.MANGO_PORT || '8080',
      desc: 'Port'
    })
    .options('plugin', {
      string: true,
      desc: 'Plugin'
    })
    .options('host', {
      string: true,
      alias: 'h',
      default: process.env.MANGO_HOST || 'localhost',
      desc: 'Host'
    })
    .options('token', {
      string: true,
      alias: 't',
      default: process.env.MANGO_TOKEN || '',
      desc: 'Token'
    })
    .options('secret', {
      string: true,
      alias: 's',
      default: process.env.MANGO_SECRET || '',
      desc: 'Secret'
    })
    .options('plugin', {
      array: true,
      desc: 'Plugin'
    })
    .version(require('../package.json').version)
    .alias('version', 'v')
    .help('help')
    .alias('help', 'h')
    .argv
}