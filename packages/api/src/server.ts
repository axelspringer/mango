// args
import { parseArgs } from './args'
import { Middleware } from './middleware'
import { WP } from './loader'
import axios from 'axios'
import { MockAdapter } from './mock'

// config
const config = parseArgs()

// construct context
const ctx = {
  config,
  axios: axios.create({ baseURL: config.endpoint }),
  loader: new WP()
}

// inject mock
if (config.mock) {
  const adapter = new MockAdapter(ctx.axios, {})
  adapter.get('/posts', require('../data/posts.json'))
}


// run middlware
const middleware = new Middleware(ctx, config)
middleware.run()
