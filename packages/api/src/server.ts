import * as Koa from 'koa'
import * as process from 'process'
import * as koaRouter from 'koa-router'
import * as koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

// config
import config from './config'

// custom
import ping from './ping'

// schema
import wpGraphQLSchema from './schema'

// overwrite config
config.host = process.env.HOST || config.host
config.port = process.env.PORT || config.port

// construct app
const app = new Koa()
const router = new koaRouter()

// Ping
router.get('/ping', ping)

// GraphQL
router.post('/graphql', koaBody(), graphqlKoa({ schema: wpGraphQLSchema }));
router.get('/graphql', graphqlKoa({ schema: wpGraphQLSchema }));

// GraphQLi
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

// middlewares
app.use(router.routes())
app.use(router.allowedMethods())

// listen
app.listen(config.port)
