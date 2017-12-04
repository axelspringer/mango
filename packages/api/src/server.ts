// args
import { parseArgs } from './args'
import { Middleware } from './middleware'
import { WP } from './loader'

// config
const config = parseArgs()

// construct context
const ctx = {
  config,
  loader: new WP()
}

// run middlware
const middleware = new Middleware(ctx, config)
middleware.run()
