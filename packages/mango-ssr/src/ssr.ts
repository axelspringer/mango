import * as Koa from 'koa'
import * as mount from 'koa-mount'
import { log } from './utils/log'
import createRenderer from './renderer'
import serve from './utils/serve'
import { IConfig } from './config'
import webpack from './webpack'
import * as fs from 'fs'
import logger from './logger'
import { relative, resolve } from './utils/path'
import * as GracefulShutdown from 'http-graceful-shutdown'

export interface IServerSideRenderer {
  ready: Promise<any>
  listener

  createRenderer(): void
  start(): void
}

// server side renderer
export class ServerSideRenderer implements IServerSideRenderer {

  public ready: Promise<any>
  public renderer = null
  public listener = null
  public log = null
  public timeout = null
  public config: IConfig

  /**
   *
   * @param config - The SSR config
   * @param app - A koa server for delivery
   */
  constructor(config, public app = undefined) {
    this.app = app || new Koa() // create a new Koa server
    this.log = log
    this.config = config

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
      this.ready = webpack(this.app, this.config, (bundle, template, options) => {
        this.renderer = createRenderer(bundle, template, options)
      })

      return
    }

    const bundle = require(relative(__dirname, this.config.bundle))
    const clientManifest = require(relative(__dirname, this.config.manifest))
    const template = fs.readFileSync(resolve(this.config.template), 'utf-8')
    this.renderer = createRenderer(bundle, template, {
      clientManifest
    })
    // this.ready = Promise.resolve()
  }

  /**
   * Starts a new renderer
   *
   * @return
   */
  public start() {
    // logging
    this.app.use(logger())

    // catch failure
    this.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
      }
    })

    // serve static files
    this.app.use(mount('/static', serve(this.config)))

    // console.log
    this.app.on('error', (err, ctx) => {
      console.log(err, ctx) // log error
    })

    // create renderer
    this.createRenderer()

    // config requests
    // render to
    this.app.use(this.render)

    // attach server
    this.listener = this.app.listen(this.config.port)
  }

  /**
   * Render bundle
   */
  public render = async (ctx, next) => {
    await next()

    ctx.set('Content-Type', 'text/html')

    if (!this.renderer) {
      ctx.body = 'waiting for compilation... refresh in a moment.'
      return
    }

    // use streaming...
    if (this.config.stream) {
      // register on stream
      ctx.body = this.renderer.renderToStream({ url: ctx.req.url })
        // .on('error', errorHandler.bind({ req, res }))
        .pipe(ctx.req.pipe)
    }

    // use rendered string
    try {
      // should do 404
      ctx.body = await this.renderString({ url: ctx.req.url })
    } catch (err) {
      ctx.throw(500, err)
    }
  }

  /**
   * Render to string
   *
   */
  public renderString = async (ctx: any, cb?): Promise<string> => {
    return this.renderer.renderToString(ctx, cb)
  }
}
