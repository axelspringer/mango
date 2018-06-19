import * as argv from 'yargs'
import * as process from 'process'
import Env from './env'

export function parseArgs() {
  return argv
    .usage('Usage: $0 [options]')
    .options('wp', {
      string: true,
      alias: 'w',
      default: Env.WP,
      desc: 'WordPress API Endpoint'
    })
    .options('env', {
      string: true,
      alias: 'e',
      default: Env.Env,
      desc: 'Set Runtime environment'
    })
    .options('port', {
      string: true,
      alias: 'p',
      default: Env.Port,
      desc: 'Port'
    })
    .options('plugin', {
      string: true,
      default: Env.Plugins,
      desc: 'Plugin'
    })
    .options('host', {
      string: true,
      alias: 'h',
      default: Env.Host,
      desc: 'Host'
    })
    .options('token', {
      string: true,
      alias: 't',
      default: Env.Token,
      desc: 'Token'
    })
    .options('secret', {
      string: true,
      alias: 's',
      default: Env.Secret,
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
