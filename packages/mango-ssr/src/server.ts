import { parseArgs } from './args'
import { resolve } from './utils/path'
import { Config, IConfig } from './config'
import { ServerSideRenderer } from './ssr'
import { log, error, warning } from './utils/log'

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
const app = new ServerSideRenderer(ssrConfig)
app.start()
