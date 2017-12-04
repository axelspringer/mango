import * as Koa from 'koa'
import * as koaRouter from 'koa-router'
import * as koaBody from 'koa-bodyparser'
import * as cors from '@koa/cors'
import * as logger from 'koa-logger'
import { EventEmitter } from 'events'

// apollo
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

// custom
import ping from './ping'

// schema
import wpGraphQLSchema from './schema'

export class Middleware extends EventEmitter {

  private app: any
  private router: any

  constructor(public ctx, public config) {
    super()

    this.app = new Koa()
    this.router = new koaRouter()

    // Ping
    this.router.get('/ping', ping)

    // GraphQL
    this.router.post('/graphql', koaBody(), graphqlKoa({ schema: wpGraphQLSchema, context: this.ctx }));
    this.router.get('/graphql', graphqlKoa({ schema: wpGraphQLSchema, context: this.ctx }));

    // GraphQLi
    this.router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

    // middlewares
    this.app.use(logger())
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
    this.app.use(cors({ origin: '*' }))
  }

  public run() {
    // listen
    this.app.listen(this.config.port)
  }
}
