import { Config } from './config'
import { resolve, relative } from './utils/path'
import { log } from './utils/log'
import serve from './utils/serve'
import { setupDevServer } from './webpack'
import { createRenderer } from 'vue-server-renderer'
import { Renderer } from 'vue-server-renderer/types'
import * as express from 'express'
import * as fs from 'fs'
import * as GracefulShutdown from 'http-graceful-shutdown'
import * as pino from 'express-pino-logger'
import createBundleRenderer from './utils/createRenderer'
import renderPlugin from './utils/renderPlugin'
import appRender from './utils/appRender'

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

    const bundle = require(relative(this.config.bundle, __dirname))
    const clientManifest = require(relative(this.config.manifest, __dirname))
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
    !this.config.serve || this.app.use('/static', serve(this.config))

    // config render plugins
    !this.config.universalRenderer || this.configPlugins()

    // create renderer
    !this.config.renderer || this.createRenderer()

    // config last to render bundle
    !this.config.renderer || this.app.all('*', appRender.bind(this)) //

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
  public configPlugins() {
    this.config.plugins.forEach(plugin => { // configure plugins
      this.app.all(plugin.route, renderPlugin.bind(Object.assign(this, { plugin })))
    })
  }
}
