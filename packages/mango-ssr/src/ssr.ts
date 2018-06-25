import Config from './config'
import { log } from './utils/log'
import { setupDevServer } from './webpack'
import { Renderer } from 'vue-server-renderer/types'
import { relative, resolve } from './utils/path'
import * as Koa from 'koa'
import * as Logger from 'koa-pino-logger'
import * as Router from 'koa-router'
import * as fs from 'fs'
import * as Compress from 'koa-compress'
import createBundleRenderer from './utils/createRenderer'
import renderPlugin from './utils/renderPlugin'
import Errors from './middlewares/errors'
import Serve from './middlewares/serve'
import Ignore from './middlewares/ignore'
import ForceSSL from './middlewares/ssl'
import * as gracefulShutdown from 'http-graceful-shutdown'

import appRender from './utils/appRender'
import Env from './env'

// custom renderer
const { createRenderer } = require('@axelspringer/vue-server-renderer')

// server side renderer
export class ServerSideRenderer {

  public plugins: Renderer[] // this is the general renderer
  public router
  public listener

  public webpack
  public renderer

  public server
  public log
  public timeout

  /**
   *
   * @param config - The SSR config
   * @param app - A Express server for delivery
   */
  constructor(public config: Config, public app = undefined) {
    // set to koa
    this.app = app || new Koa()

    // config router
    this.router = new Router()

    // add error-handler
    this.app.use(Errors())

    // configure logging
    this.app.silent = true
    this.app.use(Logger())

    // setup middleware
    this.setup()

    // init
    this.init()
  }

  /**
   * Initialize
   *
   */
  public init() {
    this.initPlugins()
    this.createRenderer()
  }

  /**
   * Configure middleware
   */
  public setup() {
    // add ignore plugin
    this.app.use(Ignore(this.config.ignore))

    // force ssl
    if (this.config.forceSSL) {
      this.app.use(ForceSSL())
    }

    // add middlewares
    this.config.middleware.forEach(middleware => {
      this.app.use(middleware)
    })

    Env.Development || this.app.use(Compress({
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    }))
    Env.Development || this.app.use(Serve({ rootDir: this.config.serve }))
  }

  /**
   * Initialize plugins
   */
  public initPlugins() {

    this.plugins = this.config.plugins.map(plugin => {
      const options: any = {} // construct options
      if (plugin.isUnaryTag) {
        options.isUnaryTag = plugin.isUnaryTag
      }

      const renderer = createRenderer(options) // this creates a renderer for every plugin
      this.router // map all
        .all(
          plugin.route,
          async (ctx, next) => {
            ctx.state.renderer = renderer
            ctx.state.plugin = plugin
            ctx.state.config = this.config

            await next()
          },
          renderPlugin
        )
      return renderer // create renderer per registered plugin
    })
  }

  /**
   * Creates a new renderer
   *
   */
  public createRenderer() {
    if (Env.Development) { // dev
      this.webpack = setupDevServer(this.app, this.config, (bundle, template, options) => {
        this.renderer = createBundleRenderer(bundle, template, options)
      })

      return // do not configure real renderer
    }

    if (!this.config.renderer) {
      return
    }

    const bundle = require(relative(this.config.bundle, __dirname))
    const clientManifest = require(relative(this.config.manifest, __dirname))
    const template = fs.readFileSync(resolve(this.config.template), 'utf-8')
    this.renderer = createBundleRenderer(bundle, template, {
      clientManifest
    })
  }

  /**
   * Starts a new renderer
   *
   * @return
   */
  public start() {
    if (this.config.renderer) {
      // config renderer route
      this.router
        .all(
          '*',
          async (ctx, next) => {
            ctx.state.renderer = this.renderer

            await next()
          },
          appRender
        )
    }

    this.app // config app
      .use(this.router.routes())
      .use(this.router.allowedMethods())

    // attach server
    this.listener = this.app.listen(this.config.port)

    // debug
    log(`listening on port: ${this.config.port}`)

    // register graceful shutdown
    gracefulShutdown(this.listener, {
      signals: 'SIGINT SIGTERM',
      timeout: 30 * 1000,
      development: Env.Development,
      onShutdown: this.cleanup,
      finally: function () {
        log(`Server gracefully shut down ...`)
      }
    })
  }

  /**
   * Cleanup
   */
  public cleanup() {
    return new Promise((resolve) => {
      if (this.webpack) {
        log(`Cleaninup webpack`)
        this.webpack.close()
      }
      resolve()
    });
  }

}
