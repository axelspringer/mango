import chalk from 'chalk'

export const log = console.log // logging
export const error = chalk.bold.red;
export const warning = chalk.keyword('orange');

export function errorHandler(err) {
  if (err && err.code === 404) {
    this.res.status(404).end('404 | Page Not Found')
  } else {
    // Render Error Page or Redirect
    this.res.status(500).end('500 | Internal Server Error')
    console.error(`error during render : ${this.req.url}`)
    console.error(err)
  }
}
