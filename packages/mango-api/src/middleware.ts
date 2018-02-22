// imports
import * as Koa from 'koa'
import * as koaRouter from 'koa-router'
import * as koaBody from 'koa-bodyparser'
import * as cors from '@koa/cors'
// import * as logger from 'koa-logger'
import logger from './logger'
import { EventEmitter } from 'events'
import { Winston } from 'winston'
import { Mock, MockAdapter } from './mock'

// apollo
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

// custom
import ping from './ping'
import health from './health'
import { isProd } from './utils'

// schema
import createSchema from './schema'

export class Middleware extends EventEmitter {

  private app: Koa
  private router: koaRouter

  constructor(public ctx, public config, public log: Winston) {
    super()

    // call to inject mock
    if (this.config.mock) {
      Middleware.injectMock(this.ctx.axios, this.config)
    }

    // Koa
    this.app = new Koa()
    this.router = new koaRouter()

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
    this.router.post('/graphql', koaBody(), graphqlKoa({ schema: createSchema(this.config.plugin), context: this.ctx }))
    this.router.get('/graphql', graphqlKoa({ schema: createSchema(this.config.plugin), context: this.ctx }))


    // GraphiQL (if not in production)
    if (!isProd) {
      this.router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
    }
  }

  // run the middleware
  public run() {
    // listen
    this.app.listen(this.config.port)
  }

  // inject mock
  public static injectMock(axios, config) {
    const adapter = new MockAdapter(axios, config)
    new Mock(adapter)
    config.plugin.forEach(plugin => {
      new plugin.mock(adapter)
    })
  }
}
