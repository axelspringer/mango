import { Config } from '../config'
import * as compress from 'express-static-gzip'
import * as express from 'express'
import { isProd } from '../helpers'

export default (config: Config) => isProd
  ? compress(config.serve, {
    // evalute times on prod
    maxAge: config.cache && isProd ? 60 * 60 * 24 * 30 : 0,
    enableBrotli: true
  })
  : express.static(config.serve)
