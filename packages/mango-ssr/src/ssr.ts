import { Config } from './config'
import { serve, log, resolve, relative } from './helpers'
import { setupDevServer } from './webpack'
import { createRenderer } from 'vue-server-renderer'
import * as _ from 'lodash'
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
  pluginRenderer // this is a general renderer

  createRenderer(): void
  start(): void
}


// server side renderer
export class ServerSideRenderer implements IServerSideRenderer {

  public ready: Promise<any>
  public renderer
  public pluginRenderer // this is the general renderer
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
    this.pluginRenderer = createRenderer()

    // graceful shutdown
    GracefulShutdown(this.app, {
      development: this.config.dev,
      finally: function () {
        log('Server gracefully shut down ....')
      }
    })
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

    // create renderer
    this.createRenderer()

    // config render plugins
    this.configPlugins()

    // config last to render bundle
    this.app.get('*', this.render.bind(this)) //

    // attach server
    this.server = this.app.listen(this.config.port, () => {
      log(`server started at http://localhost:${this.config.port}`)
    })

    // return promise
    return this.ready
  }

  /**
   *  Config plugins
   */
  public async configPlugins() {
    this.config.plugins.forEach(plugin => { // configure plugins
      this.app.get(plugin.route, renderPlugin.bind(Object.assign(this, { plugin })))
    })
  }

  /**
   *  Render context
   */
  public async render(req, res) {
    if (!this.renderer) {
      return res.end('waiting for compilation... refresh in a moment.')
    }
    res.setHeader('Content-Type', 'text/html')

    // use streaming...
    if (this.config.stream) {
      // register on stream
      this.renderer.renderToStream({ url: req.url })
        .on('error', errorHandler.bind({ req, res }))
        .pipe(res)

      return
    }

    // use rendered string
    try {
      // should do 404
      const html = await this.renderString({ url: req.url })
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
  public async renderPluginToString(render: any, template: any, ctx: {}): Promise<string> {
    const compiled = _.template(template)
    let rendered = {}

    function cb(rendered, prop) {
      return (err, output) => {
        console.log(err)
        rendered[prop] = output
      }
    }

    await Promise.all([...Object.keys(render).map(key => this.pluginRenderer.renderToString(render[key], ctx, cb(rendered, key)))])

    console.log(rendered)

    return compiled(rendered)
  }

  /**
   * Render to string
   *
   */
  public async renderString(ctx: any, cb?): Promise<string> {
    return this.renderer.renderToString(ctx, cb)
  }
}
