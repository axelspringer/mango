import * as express from 'express'
import * as pino from 'express-pino-logger'
import * as fs from 'fs'
import { serve, log, resolve, relative, createRenderer } from './helpers'
import { Config } from './config'
import { setupDevServer } from './webpack'


export interface IServerSideRenderer {
  ready: Promise<any>

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

    // register server events
    process.on('SIGTERM', this.stop.bind(this));
    process.on('SIGINT', this.stop.bind(this));
  }

  /**
   * Creates a new renderer
   *
   */
  public createRenderer() {
    // if this is production
    if (!this.config.dev) {
      const bundle = require(relative(this.config.bundle))
      const clientManifest = require(relative(this.config.manifest))
      const template = fs.readFileSync(resolve(this.config.template), 'utf-8')
      this.renderer = createRenderer(bundle, template, {
        clientManifest
      })
      this.ready = Promise.resolve()
    }

    // if this is development
    if (this.config.dev) {
      this.ready = setupDevServer(this.app, this.middlewares, this.config, (bundle, template, options) => {
        this.renderer = createRenderer(bundle, template, options)
      })
    }
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
    this.app.get('*', (req, res) => {
      if (!this.renderer) {
        return res.end('waiting for compilation... refresh in a moment.')
      }

      res.setHeader('Content-Type', 'text/html')

      const errorHandler = err => {
        if (err && err.code === 404) {
          res.status(404).end('404 | Page Not Found')
        } else {
          // Render Error Page or Redirect
          res.status(500).end('500 | Internal Server Error')
          console.error(`error during render : ${req.url}`)
          console.error(err)
        }
      }

      this.renderer.renderToStream({ url: req.url })
        .on('error', errorHandler)
        .pipe(res)
    })

    // attach server
    this.server = this.app.listen(this.config.port, () => {
      log(`server started at http://localhost:${this.config.port}`)
    })

    // return promise
    return this.ready
  }

  /**
   * Stopping the renderer
   */
  public stop() {
    if (this.config.dev) { // just exit in dev
      process.exit()
    }

    log(`Closing remaining connections.`)
    this.middlewares.forEach(middleware => !middleware.close || middleware.close())
    this.server.close(() => process.exit()) // close connections

    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => { // set timeout to close connections
      log(`Failed to close connections after ${this.config.timeout / 1000}s. Forcing shutdown.`)
      process.exit()
    }, this.config.timeout)
  }
}
