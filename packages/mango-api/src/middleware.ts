// imports
import * as Koa from 'koa'
import * as koaRouter from 'koa-router'
import * as koaBody from 'koa-bodyparser'
import * as cors from '@koa/cors'
// import * as logger from 'koa-logger'
import logger from './logger'
import { EventEmitter } from 'events'
import { Winston } from 'winston'
import { addDefaultMocks, addPluginMocks, MockAdapter } from './mock'
// import { Discovery, RandomStrategy } from './discovery'
import * as GracefulShutdown from 'http-graceful-shutdown'

// apollo
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

// custom
import ping from './ping'
import health from './health'
import { isDev, isProd } from './utils'

export class Middleware extends EventEmitter {

  private app: Koa
  private router: koaRouter
  private adapter: any

  constructor(public ctx, public config, public schema, public log: Winston) {
    super()

    // use mock adapter
    // if (this.config.mock) {
    //   this.adapter = new MockAdapter(this.ctx.axios, this.config)
    //   addDefaultMocks(this.adapter)
    //   addPluginMocks(this.adapter, this.config)
    // }

    // Koa
    this.app = new Koa()
    this.router = new koaRouter()

    // graceful shutdown
    GracefulShutdown(this.app, {
      development: !isProd,
      finally: function () {
        console.log('Server gracefully shut down ....')
      }
    })

    // Microservice resolver
    // new Discovery(new RandomStrategy(), this.ctx)

    // Middlewares
    this.app.use(logger())
    this.app.use(cors({ origin: '*' }))
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())

    // Custom error
    this.app.use(async (_, next) => {
      try {
        await next()
      } catch (err) {
        console.log('error')
      }
    })

    // Health
    this.router.get('/', health)

    // Ping
    this.router.get('/ping', ping)

    // GraphQL
    this.router.post('/graphql', koaBody(), graphqlKoa({
      schema, context: this.ctx,
      tracing: isDev,
      cacheControl: !isDev
    }))

    this.router.get('/graphql', graphqlKoa({
      schema, context: this.ctx,
      tracing: isDev,
      cacheControl: !isDev
    }))

    // enable GraphiQL only in dev
    if (isDev) {
      this.router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
    }
  }

  // run the middleware
  public start() {
    // listen
    this.app.listen(this.config.port)
  }
}
