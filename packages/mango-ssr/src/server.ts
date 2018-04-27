import { parseArgs } from './args'
import { resolve } from './helpers'
import { Config, IConfig } from './config'
import { ServerSideRenderer } from './ssr'
import { log, error, warning, shutdownServer } from './helpers'

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

// register server events
process.on('SIGTERM', shutdownServer.bind(this, app));
process.on('SIGINT', shutdownServer.bind(this, app));
