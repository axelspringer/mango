import * as path from 'path'
import * as express from 'express'
import * as process from 'process'
import * as compress from 'express-static-gzip'
import { Config } from './config'
import chalk from 'chalk'

export const log = console.log // logging
export const error = chalk.bold.red
export const warning = chalk.keyword('orange')

export const isProd = process.env.NODE_ENV === 'production'
export const resolve = file => path.resolve(process.cwd(), file)
export const relative = file => path.relative(__dirname, file)
export const serve = (config: Config) => isProd
  ? compress(config.serve, {
    // evalute times on prod
    maxAge: config.cache && isProd ? 60 * 60 * 24 * 30 : 0,
    enableBrotli: true
  })
  : express.static(config.serve)
