import { parseArgs } from './args'
import { resolve } from './helpers'
import { Config, IConfig } from './config'
import { SSR } from './ssr'
import chalk from 'chalk'

// logging
const log = console.log
const error = chalk.bold.red;
const warning = chalk.keyword('orange');

// config ssr
let ssrConfig: Config

// parse arguments
const args = parseArgs()

// check for config
try {
  const configFile = args.config || './mango.config.js'
  const config: IConfig = require(resolve(configFile))
  ssrConfig = new Config(config)
} catch (err) {
  // exit on
  if (err.code !== 'MODULE_NOT_FOUND') {
    log(error(err))
    process.exit(1)
  }

  log(warning(`No config file found, or provided by '--config.' Using command line arguments.`))
  ssrConfig = new Config(args) // use command line args
}

// init new server-side renderer
const app = new SSR(ssrConfig)
app.start()
