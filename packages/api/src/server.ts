// imports
import { parseArgs } from './args'
import { Middleware } from './middleware'
import { Plugin } from './plugin'
import { WP } from './loader'
import * as http from 'http'
import * as https from 'https'
import axios from 'axios'
import { isDev } from './utils'
import { MockAdapter } from './mock/adapter'
import { PostType, SettingsType, NavMenuLocation, NavMenuItemType } from './type'

// use default for import
const { createLogger, format, transports } = require('winston')

// config
const config = parseArgs()

const loadPlugin = plugin => {
  const { main } = require('../../' + 'mango-plugin-' + plugin + '/package.json')
  return require('../../' + 'mango-plugin-' + plugin + '/' + main)
}

// map plugin
config.plugin = config.plugin.map(plugin => new Plugin(loadPlugin(plugin)))

// logger
const logger = createLogger({
  level: 'info',
  format: format.simple(),
  transports: [
    // save for later
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' })
  ]
});

// add console transport in dev
if (isDev) {
  logger.add(new transports.Console({
    format: format.simple()
  }))
}

// headers to send with, X-MANGO-TOKEN, X-MANGO-SECRET
const headers = {
  'X-MANGO-TOKEN': config.token,
  'X-MANGO-SECRET': config.secret
}

// configure agent
const agent = {
  keepAlive: true
}

// construct context
const ctx = {
  config,
  timeout: 1 * 1000, // only wait 1 second before timeout
  httpAgent: new http.Agent(agent),
  httpsAgent: new https.Agent(agent),
  axios: axios.create({
    baseURL: config.wp,
    headers
  }),
  loader: new WP()
}

// run middlware
const middleware = new Middleware(ctx, config, logger)
middleware.run()

export {
  MockAdapter,
  PostType,
  SettingsType,
  NavMenuLocation,
  NavMenuItemType,
  WP
}
