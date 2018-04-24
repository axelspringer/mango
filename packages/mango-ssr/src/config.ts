import { isProd } from './helpers'
import * as process from 'process'

export interface IConfig {
  bundle: string
  cache: boolean
  dev: boolean
  manifest: string
  maxAge: number
  port: number
  serve: string
  template: string
  webpack: string
}

export class Config implements IConfig {

  public serve
  public bundle
  public manifest
  public template
  public webpack
  public dev = !isProd
  public cache = true
  public maxAge = isProd ? 60 * 60 * 24 * 30 : 0
  public port = process.env.PORT || isProd ? 8080 : 3000

  constructor({ serve, bundle, manifest, template, webpack, dev, cache, maxAge, port }) {
    this.serve = serve || this.serve
    this.bundle = bundle || this.bundle
    this.manifest = manifest || this.manifest
    this.template = template || this.template
    this.webpack = webpack || this.webpack
    this.dev = dev !== undefined ? dev : this.dev
    this.cache = cache !== undefined ? cache : this.cache
    this.maxAge = maxAge || this.maxAge
    this.port = port || this.port
  }
}
