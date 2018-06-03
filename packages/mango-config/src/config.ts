import { Log } from './log'
import { resolve } from './utils/path'
import * as process from 'process'

export class Config {
  public log = new Log()
  public config: any = {}

  constructor(public args: any = {}, public defaults: any = {}) {
    this.loadConfig() // try to load config

    this.config = Object.assign({}, this.defaults, this.args, this.config) // merge everything
  }

  public loadConfig() {
    // check for config
    try {
      const configFile = this.args.config || './mango.config.js'
      this.config = require(resolve(configFile))
    } catch (err) {
      // exit on
      if (err.code !== 'MODULE_NOT_FOUND') {
        this.log.error(err)
        process.exit(1)
      }

      this.log.warning(`No config file found, or provided by '--config.' Using command line arguments.`)
    }
  }
}
