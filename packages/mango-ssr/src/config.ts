import { isProd } from './utils/env'
import { resolve } from './utils/path'
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
  timeout: number
  stream: boolean
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
  public stream = false
  public timeout = 10 * 1000

  constructor({ serve, bundle, stream, manifest, template, webpack, dev, cache, maxAge, port }) {
    // defaults
    this.serve = serve || this.serve
    this.bundle = bundle || this.bundle
    this.manifest = manifest || this.manifest
    this.template = template || this.template
    this.webpack = webpack || this.webpack
    this.dev = dev !== undefined ? dev : this.dev
    this.cache = cache !== undefined ? cache : this.cache
    this.maxAge = maxAge || this.maxAge
    this.port = port || this.port
    this.stream = stream || this.stream

    // resolve paths
    this.serve = resolve(this.serve)
    this.bundle = resolve(this.bundle)
    this.manifest = resolve(this.manifest)
    this.template = resolve(this.template)
    this.webpack = resolve(this.webpack)
  }
}
