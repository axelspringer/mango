import chalk from 'chalk'

export const log = console.log // logging
export const error: any = chalk.red
export const info: any = chalk.blue
export const warning: any = chalk.keyword('orange')
