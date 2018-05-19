import * as argv from 'yargs'
import { isDev } from './utils/env'
import Env from './env'

export function parseArgs() {
  return argv
    .usage('Usage: $0 [options]')
    .options('dev', {
      default: Env.Dev || isDev,
      desc: 'Enable development mode'
    })
    .options('config', {
      string: true,
      alias: 'c',
      default: Env.Config,
      desc: 'Mango config'
    })
    .options('stream', {
      default: process.env.MANGO_STREAM || false,
      desc: 'Use renderer streaming'
    })
    .options('serve', {
      string: true,
      alias: 's',
      default: process.env.MANGO_SERVE,
      desc: 'Static asset folder'
    })
    .options('servePath', {
      string: true,
      default: process.env.MANGO_SERVE_PATH || '/static',
      desc: 'Path to serve static folder on'
    })
    .options('bundle', {
      string: true,
      alias: 'b',
      default: process.env.MANGO_BUNDLE,
      desc: 'Server bundle (e.g. vue-ssr-server-bundle.json)'
    })
    .options('manifest', {
      string: true,
      alias: 'm',
      default: process.env.MANGO_MANIFEST,
      desc: 'Client manifest file (e.g. vue-ssr-client-manifest.json)'
    })
    .options('template', {
      string: true,
      alias: 't',
      default: process.env.MANGO_TEMPLATE,
      desc: 'Template to render (e.g. index.html)'
    })
    .options('webpack', {
      string: true,
      alias: 'w',
      default: process.env.MANGO_WEBPACK,
      desc: 'Webpack config to use (e.g. server.ts)'
    })
    .version(require('../package.json').version)
    .alias('version', 'v')
    .help('help')
    .alias('help', 'h')
    .argv
}
