
import * as express from 'express'
import setupDevServer from '../config/server'

// helpers
import { DevServerConfig } from '../config/custom'

// config
// const isProd = process.env.NODE_ENV === 'production'

// app
const app = express()
const port = process.env.PORT || DevServerConfig.port

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// setup server
const readyPromise = setupDevServer(app)

// start server
const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
