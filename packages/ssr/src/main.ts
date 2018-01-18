import * as express from 'express'
import * as pino from 'express-pino-logger'
import * as path from 'path'
import * as fs from 'fs'
import { serve, resolve, relative, createRenderer } from './helpers'
import { SSRConfig } from './config'
import { setupDevServer } from './webpack'

// server side renderer
export class SSR {

  public ready: Promise<any>
  public renderer
  public app = express()
  public server

  constructor(public config: SSRConfig) { }

  public createRenderer() {
    if (!this.config.dev) {
      const bundle = require(relative(this.config.bundle))
      const clientManifest = require(relative(this.config.manifest))
      const template = fs.readFileSync(resolve(this.config.template), 'utf-8')
      this.renderer = createRenderer(bundle, template, {
        clientManifest
      })
      this.ready = Promise.resolve()
    } else {
      this.ready = setupDevServer(this.app, this.config, (bundle, template, options) => {
        this.renderer = createRenderer(bundle, template, options)
      })
    }
  }

  public start() {
    this.createRenderer()

    // logging
    this.app.use(pino())

    // static files
    this.app.use('/static', serve(this.config))

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

    this.server = this.app.listen(this.config.port, () => {
      console.log(`server started at http://localhost:${this.config.port}`)
    })

    return this.ready
  }

  public stop() {
    if (!this.server) {
      return
    }
    this.server.close()
  }

}

export { SSRConfig }
