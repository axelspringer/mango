import chalk from 'chalk'

export const log = console.log // logging
export const info = chalk.keyword('blue')
export const error = chalk.bold.red
export const warning = chalk.keyword('orange')
