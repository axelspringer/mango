// imports
import './utils/almost'
import SimpleRoundRobin from './discovery/simple'
import { loadPlugins, createSchema, createQuery, createMutation } from './utils'
import { Middleware } from './middleware'
import { parseArgs } from './args'
import * as http from 'http'
import * as https from 'https'
import { DefaultQuery, DefaultMutation } from './type'
import Env from './env'
import Loader from './loader'
import setup from './adapter/setup'

// use default for import
const { createLogger, format, transports } = require('winston')

// config
const config = parseArgs()

// set maxAge
config.maxAge = Env.Production ? Env.MaxAge : 0
config.cache = Env.Production
config.tracing = Env.Development

// config set maxAge
config.dns = {
  enable: Env.Production,
  ttl: Env.TTL,
  cachesize: 100
}

// initialize loader
const loader = new Loader() // contains the loaders
const query = {} // should contain all queries
const mutation = {} // should contain all mutation

// load plugins
loadPlugins(config.plugin, loader, query, mutation)

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
logger.add(new transports.Console({
  format: format.simple()
}))

// headers to send with, X-MANGO-TOKEN, X-MANGO-SECRET
const headers = {
  'X-MANGO-TOKEN': config.token,
  'X-MANGO-SECRET': config.secret
}

// configure agent
const agent = {
  keepAlive: true
}

// create axios instance
const fetch = setup({
  baseURL: config.wp,
  timeout: 60 * 1000, // wait 1 minute
  httpAgent: new http.Agent(agent),
  httpsAgent: new https.Agent(agent),
  cache: config.cache, // use cache
  discovery: SimpleRoundRobin,
  dnsCacheConfig: config.dns,
  maxAge: config.maxAge,
  headers
})

// construct context
const ctx = {
  config,
  axios: fetch,
  loader
}

// construct schema variables
const querySchema = createQuery(Object.assign(DefaultQuery, query))
const mutationSchema = createMutation(Object.assign(DefaultMutation, mutation))

// start middleware
const middleware = new Middleware(ctx, config, createSchema(querySchema, mutationSchema), logger)
middleware.start()
