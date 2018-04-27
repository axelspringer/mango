import * as express from 'express'
import * as pino from 'express-pino-logger'
import * as fs from 'fs'
import { serve, log, resolve, relative, warning, createRenderer, error, errorHandler } from './helpers'
import { Config } from './config'
import { setupDevServer } from './webpack'

export interface IServerSideRenderer {
  ready: Promise<any>
  server

  createRenderer(): void
  start(): void
  stop(): void
}

// server side renderer
export class ServerSideRenderer implements IServerSideRenderer {

  public ready: Promise<any>
  public renderer
  public server
  public log
  public middlewares = []
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
  }

  /**
   * Creates a new renderer
   *
   */
  public createRenderer() {
    if (this.config.dev) { // dev
      this.ready = setupDevServer(this.app, this.middlewares, this.config, (bundle, template, options) => {
        this.renderer = createRenderer(bundle, template, options)
      })

      return
    }

    const bundle = require(relative(this.config.bundle))
    const clientManifest = require(relative(this.config.manifest))
    const template = fs.readFileSync(resolve(this.config.template), 'utf-8')
    this.renderer = createRenderer(bundle, template, {
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

    // config requests
    // render to
    this.app.get('*', this.render.bind(this))

    // attach server
    this.server = this.app.listen(this.config.port, () => {
      log(`server started at http://localhost:${this.config.port}`)
    })

    // return promise
    return this.ready
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
  public async renderString(ctx: any, cb?): Promise<string> {
    return this.renderer.renderToString(ctx, cb)
  }

  /**
   * Stopping the renderer
   */
  public stop() {
    if (this.config.dev) { // just exit in dev
      log(warning(`Forcing shutdown in development.`))
      process.exit()
    }

    log(warning(`Closing remaining connections.`))
    this.middlewares.forEach(middleware => !middleware.close || middleware.close())
    this.server.close(() => process.exit()) // close connections

    if (this.timeout) { // clear existing timeout
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => { // set timeout to close connections
      log(error(`Failed to close connections after ${this.config.timeout / 1000}s. Forcing shutdown.`))
      process.exit()
    }, this.config.timeout)
  }
}
