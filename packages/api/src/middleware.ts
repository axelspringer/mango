// imports
import * as LogMessage from './log'
import * as Koa from 'koa'
import * as koaRouter from 'koa-router'
import * as koaBody from 'koa-bodyparser'
import * as cors from '@koa/cors'
import * as logger from 'koa-logger'
import { MockAdapter } from './mock'
import { EventEmitter } from 'events'
import { Winston } from 'winston'
import { WP } from './loader/wp'

// apollo
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

// custom
import ping from './ping'

// schema
import wpGraphQLSchema from './schema'

export class Middleware extends EventEmitter {

  private app: Koa
  private router: koaRouter

  constructor(public ctx, public config, public log: Winston) {
    super()

    // call to inject mock
    if (this.config.mock) {
      this.injectMock()
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

  // run the middleware
  public run() {
    // listen
    this.app.listen(this.config.port)
  }

  // inject mock
  private injectMock() {
    const adapter = new MockAdapter(this.ctx.axios, this.config)
    adapter.get(WP.Posts, require('../data/posts.json')).reply(200)
    adapter.get(WP.NavLocations, require('../data/navLocations.json'), true).reply(200)
    adapter.get(WP.NavMenu, require('../data/navMenus.json')).reply(200)
    adapter.get(WP.NavItems, require('../data/navItems.json')).reply(200)
    // log
    this.log.log(LogMessage.mockInject.level, LogMessage.mockInject.message)
  }
}
