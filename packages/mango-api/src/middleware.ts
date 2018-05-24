// imports
import { EventEmitter } from 'events'
import { Winston } from 'winston'
import * as cors from '@koa/cors'
import * as GracefulShutdown from 'http-graceful-shutdown'
import * as Koa from 'koa'
import * as koaBody from 'koa-bodyparser'
import * as koaRouter from 'koa-router'
import Env from './env'
import logger from './logger'

// apollo
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

// custom
import ping from './ping'
import health from './health'

export class Middleware extends EventEmitter {

  private app: Koa
  private router: koaRouter
  private adapter: any

  constructor(public ctx, public config, public schema, public log: Winston) {
    super()

    // Koa
    this.app = new Koa()
    this.router = new koaRouter()

    // graceful shutdown
    GracefulShutdown(this.app, {
      development: Env.Development,
      finally: function () {
        console.log('Server gracefully shut down ....')
      }
    })

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
      tracing: Env.Development,
      cacheControl: !Env.Development
    }))

    this.router.get('/graphql', graphqlKoa({
      schema, context: this.ctx,
      tracing: Env.Development,
      cacheControl: !Env.Development
    }))

    // enable GraphiQL only in dev
    if (Env.Development) {
      this.router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
    }
  }

  // run the middleware
  public start() {
    // listen
    this.app.listen(Env.Port)
  }
}
