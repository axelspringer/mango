import { Config } from './config'
import { log, resolve, relative } from './helpers'
import serve from './utils/serve'
import { setupDevServer } from './webpack'
import { createRenderer } from 'vue-server-renderer'
import { Renderer } from 'vue-server-renderer/types'
import * as express from 'express'
import * as fs from 'fs'
import * as GracefulShutdown from 'http-graceful-shutdown'
import * as pino from 'express-pino-logger'
import createBundleRenderer from './utils/createRenderer'
import errorHandler from './utils/errorHandler'
import renderPlugin from './utils/renderPlugin'

export interface IServerSideRenderer {
  ready: Promise<any>
  server
  renderer
  universalRenderer: Renderer // this is a general renderer

  createRenderer(): void
  start(): void
}


// server side renderer
export class ServerSideRenderer implements IServerSideRenderer {

  public ready: Promise<any>
  public renderer
  public universalRenderer: Renderer // this is the general renderer
  public server
  public log
  public timeout

  /**
   *
   * @param config - The SSR config
   * @param app - A Express server for delivery
   */
  constructor(public config: Config, public app = undefined) {
    // create new express server, if not already one provided
    this.app = app || express()
    this.log = log

    // init universal Vue.js renderer
    this.universalRenderer = createRenderer()
  }

  /**
   * Creates a new renderer
   *
   */
  public createRenderer() {
    if (this.config.dev) { // dev
      this.ready = setupDevServer(this.app, this.config, (bundle, template, options) => {
        this.renderer = createBundleRenderer(bundle, template, options)
      })

      return
    }

    const bundle = require(relative(this.config.bundle))
    const clientManifest = require(relative(this.config.manifest))
    const template = fs.readFileSync(resolve(this.config.template), 'utf-8')
    this.renderer = createBundleRenderer(bundle, template, {
      clientManifest
    })
    this.ready = Promise.resolve()
  }

  /**
   * Starts a new renderer
   *
   * @return
   */
  public start() {
    // logging
    this.app.use(pino())

    // static files
    this.app.use('/static', serve(this.config))

    // config render plugins
    this.configPlugins()

    // create renderer
    this.createRenderer()

    // config last to render bundle
    this.app.all('*', this.render.bind(this)) //

    // attach server
    this.server = this.app.listen(this.config.port, () => {
      log(`server started at http://localhost:${this.config.port}`)
    })

    // graceful shutdown
    GracefulShutdown(this.app, {
      development: this.config.dev,
      finally: function () {
        log('Server gracefully shut down ....')
      }
    })

    // return promise
    return this.ready
  }

  /**
   *  Config plugins
   */
  public async configPlugins() {
    this.config.plugins.forEach(plugin => { // configure plugins
      this.app.all(plugin.route, renderPlugin.bind(Object.assign(this, { plugin })))
    })
  }

  /**
   *  Render context
   */
  public async render(req, res) {
    if (res.finished) {
      return // noop
    }

    if (!this.renderer) {
      return res.end('waiting for compilation... refresh in a moment.')
    }
    res.setHeader('Content-Type', 'text/html')

    // use streaming...
    if (this.config.stream) {
      // register on stream
      this.renderer.renderToStream({ url: req.url, req })
        .on('error', errorHandler.bind({ req, res }))
        .pipe(res)

      return
    }

    // use rendered string
    try {
      // should do 404
      const html = await this.renderString({ url: req.url, req })
      res.send(html).end()
    } catch (err) {
      // should do 404
      errorHandler.call({ req, res }, err)
    }
  }

  /**
   * Render to string
   *
   */
  public async renderString(ctx: any, cb?): Promise<string> {
    return this.renderer.renderToString(ctx, cb)
  }
}
