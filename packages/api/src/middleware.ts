import * as Koa from 'koa'
import * as koaRouter from 'koa-router'
import * as koaBody from 'koa-bodyparser'
import * as cors from '@koa/cors'
import * as logger from 'koa-logger'
import axios from 'axios'
import { MockAdapter } from './mock'
import { EventEmitter } from 'events'

// apollo
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

// custom
import ping from './ping'

// schema
import wpGraphQLSchema from './schema'

export class Middleware extends EventEmitter {

  private app: Koa
  private router: koaRouter

  constructor(public ctx, public config) {
    super()

    // init mock
    if (config.mock) {
      const adapter = new MockAdapter(axios, {})
      adapter.get('/posts', require('../data/posts.json'))
    }

    // Koa
    this.app = new Koa()
    this.router = new koaRouter()

    // Ping
    this.router.get('/ping', ping)

    // GraphQL
    this.router.post('/graphql', koaBody(), graphqlKoa({ schema: wpGraphQLSchema, context: this.ctx }));
    this.router.get('/graphql', graphqlKoa({ schema: wpGraphQLSchema, context: this.ctx }));

    // GraphQLi
    this.router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

    // Middlewares
    this.app.use(logger())
    this.app.use(cors({ origin: '*' }))
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }

  public run() {
    // listen
    this.app.listen(this.config.port)
  }
}
