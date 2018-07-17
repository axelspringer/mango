// imports
import { EventEmitter } from 'events'
import * as GracefulShutdown from 'http-graceful-shutdown'
import * as Koa from 'koa'
import RandomDiscoveryStrategy from './discovery/random'
import Env from './env'
import logger from './logger'

// apollo
import { ApolloServer } from 'apollo-server-koa'

// custom
import ping from './ping'
import health from './health'
import { throws } from 'assert'

export class Middleware extends EventEmitter {

  public app: Koa
  public adapter: any
  public listener
  public apollo: ApolloServer

  constructor(public ctx, public config, public schema, public log) {
    super()

    // Koa
    this.app = new Koa()

    // Create Apollo Server
    this.apollo = new ApolloServer({
      schema,
      tracing: Env.Development,
      cacheControl: { defaultMaxAge: Env.Development ? 0 : 60 }, // cache in dev 0s, otherwise 60s
      playground: Env.Development,
      context: this.ctx
    })

    // Middlewares
    this.app.use(logger())

    // Custom error
    this.app.use(async (_, next) => {
      try {
        await next()
      } catch (err) {
        console.log('error')
      }
    })

    // Apply Apollo Middleware
    this.apollo.applyMiddleware({
      app: this.app,
      path: '/graphql',
      cors: { origin: '*' },
      onHealthCheck: () => {
        return new Promise(async (resolve, reject) => {
          const discovery = new RandomDiscoveryStrategy()
          const url = await discovery.resolve(this.config.wp)
          console.log(url)
          this.ctx.axios.get(url)
            .catch(_err => reject(false))
            .then(() => resolve(true))
        })
      }
    })
  }

  // run the middleware
  public start() {
    // listen
    this.listener = this.app.listen(Env.Port)

    // graceful shutdown
    GracefulShutdown(this.listener, {
      development: Env.Development,
      finally: function () {
        console.log('Server gracefully shut down ....')
      }
    })
  }

  public stop() {
    this.listener.stop()
  }
}
