import * as mfs from 'memory-fs'
import * as webpack from 'webpack'
// import * as webpackHotMiddleware from 'webpack-hot-middleware'
import { relative } from './utils/path'

export function setupDevServer(app, config, cb) {
  let bundle
  let clientManifest
  let template

  let resolve
  const resolved = false
  const readyPromise = new Promise((r) => {
    resolve = r
  })
  const ready = (...args) => {
    if (!resolved) {
      resolve()
    }
    cb(...args)
  }

  const { ssrConfig, devConfig } = require(relative(config.webpack, __dirname)).default

  // modify client config to work with hot middleware
  // devConfig.entry.app = ['webpack-hot-middleware/client?reload=true', ...devConfig.entry.app]
  devConfig.output.filename = '[name].js'

  // dev middleware
  const compiler = webpack(devConfig)
  const devMiddleware = require('koa-webpack')({
    compiler,
    config: {
      publicPath: devConfig.output.publicPath,
      noInfo: true,
      stats: {
        colors: true,
        chunks: false
      },
      // serverSideRender: true
    }
  })
  app.use(devMiddleware)

  compiler.plugin('done', () => {
    const fs = devMiddleware.fileSystem
    const readFile = (file) => fs.readFileSync(file, 'utf-8')
    clientManifest = JSON.parse(readFile(config.manifest))
    template = readFile(config.template)
    if (bundle) {
      ready(bundle, template, {
        clientManifest
      })
    }
  })

  // hot middleware
  // app.use(webpackHotMiddleware(clientCompiler))

  // watch and update server renderer
  const serverCompiler = webpack(ssrConfig)
  const fs = new mfs()
  serverCompiler.outputFileSystem = fs
  serverCompiler.watch({}, (err, stats) => {
    if (err) {
      throw err
    }
    stats = stats.toJson()
    stats.errors.forEach((er) => console.error(er))
    stats.warnings.forEach((er) => console.warn(er))
    const readFile = (file) => {
      return fs.readFileSync(file, 'utf-8')
    }
    // read bundle generated by vue-ssr-webpack-plugin
    bundle = JSON.parse(readFile(config.bundle))
    if (clientManifest && template) {
      cb(bundle, template, { clientManifest })
    }
  })

  return readyPromise
}
