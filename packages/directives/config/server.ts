
import * as Webpack from 'webpack'
import * as WebpackHotMiddleware from 'webpack-hot-middleware'

// configs
import Configs from './configs'
const { devConfig } = Configs

export default function setupDevServer(app) {

  // create promise
  const readyPromise = new Promise((r) => {
    r()
  })

  // modify client config to work with hot middleware
  devConfig.entry.app = ['webpack-hot-middleware/client', ...devConfig.entry.app]
  devConfig.output.filename = '[name].js'

  // dev middleware
  const clientCompiler = Webpack(devConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: devConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true,
      chunks: false
    }
  })

  // dev server
  app.use(devMiddleware)

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')())

  // hot middleware
  app.use(WebpackHotMiddleware(clientCompiler))

  // return Promise
  return readyPromise
}
