import { Config } from './config'
import { resolve, relative } from './utils/path'
import { log } from './utils/log'
import { setupDevServer } from './webpack'
import { createRenderer } from 'vue-server-renderer'
import { Renderer } from 'vue-server-renderer/types'
import * as Koa from 'koa'
import * as Logger from 'koa-pino-logger'
import * as Router from 'koa-router'
import serve from './middlewares/serve'
// import * as Mount from 'koa-mount'
import * as Compress from 'koa-compress'
import * as fs from 'fs'
import createBundleRenderer from './utils/createRenderer'
import renderPlugin from './utils/renderPlugin'
import * as gracefulShutdown from 'http-graceful-shutdown'

import appRender from './utils/appRender'
import Env from './env'

// server side renderer
export class ServerSideRenderer {

  public plugins: Renderer[] // this is the general renderer
  public router
  public listener

  public ready: Promise<any>
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
    this.app.use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        // ctx.app.emit('error', err, ctx)
      }
    })

    // configure logging
    this.app.silent = true
    this.app.use(Logger())

    // serve static files
    this.app.use(serve({ rootDir: this.config.serve }))

    if (!Env.Development) {
      this.app.use(Compress({
        filter: function (content_type) {
          return /text/i.test(content_type)
        },
        threshold: 2048,
        flush: require('zlib').Z_SYNC_FLUSH
      }))
    }

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
   * Initialize plugins
   */
  public initPlugins() {
    this.plugins = this.config.plugins.map(plugin => {
      const renderer = createRenderer() // this creates a renderer for every plugin
      this.router // map all
        .all(
          plugin.route,
          async (ctx, next) => {
            ctx.state.renderer = renderer
            ctx.state.plugin = plugin

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
      this.ready = setupDevServer(this.app, this.config, (bundle, template, options) => {
        this.renderer = createBundleRenderer(bundle, template, options)
      })

      return // do not configure real renderer
    }

    const bundle = require(relative(this.config.bundle, __dirname))
    const clientManifest = require(relative(this.config.manifest, __dirname))
    const template = fs.readFileSync(resolve(this.config.template), 'utf-8')
    this.renderer = createBundleRenderer(bundle, template, {
      clientManifest
    })

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

  /**
   * Starts a new renderer
   *
   * @return
   */
  public start() {
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
      timeout: 30000,
      development: false,
      finally: function () {
        log(`Server gracefulls shutted down.....`)
      }
    })
  }

}
