import * as argv from 'yargs'
import * as process from 'process'

export function parseArgs() {
  return argv
    .usage('Usage: $0 [options]')
    .options('wp', {
      string: true,
      alias: 'w',
      default: process.env.SSM_WP || process.env.MANGO_WP || '',
      desc: 'WordPress API Endpoint'
    })
    .options('mock', {
      boolean: true,
      alias: 'm',
      default: process.env.SSM_MOCK || process.env.MANGO_MOCK || false,
      desc: 'Mock WordPress API Endpoints'
    })
    .options('port', {
      string: true,
      alias: 'p',
      default: process.env.SSM_PORT || process.env.MANGO_PORT || '8080',
      desc: 'Port'
    })
    .options('plugin', {
      string: true,
      default: process.env.SSM_PLUGINS ? process.env.SSM_PLUGINS.split(',').map(plugin => plugin.trim()) : undefined || process.env.MANGO_PLUGINS ? process.env.MANGO_PLUGINS.split(',').map(plugin => plugin.trim()) : undefined || [],
      desc: 'Plugin'
    })
    .options('host', {
      string: true,
      alias: 'h',
      default: process.env.SSM_HOST || process.env.MANGO_HOST || 'localhost',
      desc: 'Host'
    })
    .options('token', {
      string: true,
      alias: 't',
      default: process.env.SSM_TOKEN || process.env.MANGO_TOKEN || '',
      desc: 'Token'
    })
    .options('secret', {
      string: true,
      alias: 's',
      default: process.env.SSM_SECRET || process.env.MANGO_SECRET || '',
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
