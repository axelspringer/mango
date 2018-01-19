// imports
import * as LogMessage from './log'
import * as Koa from 'koa'
import * as koaRouter from 'koa-router'
import * as koaBody from 'koa-bodyparser'
import * as cors from '@koa/cors'
import * as path from 'path'
// import * as logger from 'koa-logger'
import logger from './logger'
import { EventEmitter } from 'events'
import { Winston } from 'winston'
import { MockDefaults } from './mock'

// apollo
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

// custom
import ping from './ping'
import { isProd } from './utils'

// schema
import wpGraphQLSchema from './schema'

export class Middleware extends EventEmitter {

  private app: Koa
  private router: koaRouter

  constructor(public ctx, public config, public log: Winston) {
    super()

    // call to inject mock
    if (this.config.mock) {
      this.injectMock(this.config.adapter, this.ctx.axios, this.config)
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

    // Ping
    this.router.get('/ping', ping)

    // GraphQL
    this.router.post('/graphql', koaBody(), graphqlKoa({ schema: wpGraphQLSchema, context: this.ctx }))
    this.router.get('/graphql', graphqlKoa({ schema: wpGraphQLSchema, context: this.ctx }))


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
  private injectMock(adapter: string, axios, config) {
    if (adapter !== null && adapter !== '') { //
      require('ts-node').register({ /* options */ })
      const mock = require(path.relative(__dirname, adapter)).default
      mock(axios, config)
    } else {
      new MockDefaults(axios, config);
    }

    // log
    this.log.log(LogMessage.mockInject.level, LogMessage.mockInject.message)
  }
}
