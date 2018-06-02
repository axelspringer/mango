// imports
import { Discovery, RandomDiscoveryStrategy } from './interceptors'
import { isDev, loadPlugins, createSchema, createQuery } from './utils'
import { Middleware } from './middleware'
import { parseArgs } from './args'
import * as http from 'http'
import * as https from 'https'
import DefaultQuery from './type'
import Env from './env'
import Loader from './loader'
import setup from './loader/setup'

// use default for import
const { createLogger, format, transports } = require('winston')

// config
const config = parseArgs()

// initialize loader
const loader = new Loader() // contains the loaders
const query = {} // should contain all queries

// load plugins
loadPlugins(config.plugin, loader, query)

// logger
const logger = createLogger({
  level: 'info',
  format: format.simple(),
  transports: [
    // save for later
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' })
  ]
})

// add console transport in dev
if (Env.Development) {
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
const axios = {
  cache: {
    maxAge: 60 * 1000,
    exclude: {
      query: false
    }
  },
  baseURL: config.wp,
  headers
}

// create axio instance
const fetch = setup(axios)

// inject discovery strategy
fetch.interceptors.request.use(...new Discovery(config.wp, new RandomDiscoveryStrategy()).use())

// construct context
const ctx = {
  config,
  timeout: 1 * 1000, // only wait 1 second before timeout
  httpAgent: new http.Agent(agent),
  httpsAgent: new https.Agent(agent),
  axios: fetch,
  loader
}

// start middleware
const middleware = new Middleware(ctx, config, createSchema(createQuery(Object.assign(DefaultQuery, query))), logger)
middleware.start()
