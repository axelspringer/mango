import * as path from 'path'
import * as process from 'process'
import chalk from 'chalk'

export const log = console.log // logging
export const error = chalk.bold.red
export const warning = chalk.keyword('orange')

export const isProd = process.env.NODE_ENV === 'production'
export const resolve = file => path.resolve(process.cwd(), file)
export const relative = file => path.relative(__dirname, file)
