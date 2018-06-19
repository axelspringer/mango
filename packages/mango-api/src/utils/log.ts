import chalk from 'chalk'

export const log = console.log // logging
export const error: any = chalk.bold.red;
export const warning: any = chalk.keyword('orange');
