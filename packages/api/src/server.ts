// imports
import { parseArgs } from './args'
import { Middleware } from './middleware'
import { WP } from './loader'
import axios from 'axios'
import { isDev } from './utils'

// use default for import
const { createLogger, format, transports } = require('winston')

// config
const config = parseArgs()

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

// construct context
const ctx = {
  config,
  axios: axios.create({ baseURL: config.endpoint }),
  loader: new WP()
}

// run middlware
const middleware = new Middleware(ctx, config, logger)
middleware.run()
