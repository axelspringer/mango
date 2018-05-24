import { resolve } from './utils/path'
import { isProd } from './utils/env'
import { Component } from 'vue/types'
import { Production, Development } from './default'
import Env from './env'

export type Plugin = {
  route: string
  header: any
  render: { [render: string]: Component }
  template?: string
}

export class Config {

  public serve: string
  public bundle: string
  public manifest: string
  public template: string
  public webpack: string
  public cache = true
  public maxAge = isProd ? 60 * 60 * 24 * 30 : 0
  public port = Env.Port || isProd ? Production.Port : Development.Port
  public stream = false
  public timeout = Env.Timeout || isProd ? Production.Timeout : Development.Timeout
  public servePath = Env.StaticPath || isProd ? Production.StaticPath : Development.StaticPath
  public plugins: Plugin[] = []
  public renderer = false
  public webpackMiddleware = false
  public universalRenderer = false

  constructor({ serve, bundle, plugins, stream, manifest, template, webpack, cache, maxAge, port }) {
    // defaults
    this.serve = serve || this.serve
    this.bundle = bundle || this.bundle
    this.manifest = manifest || this.manifest
    this.template = template || this.template
    this.webpack = webpack || this.webpack
    this.cache = cache !== undefined ? cache : this.cache
    this.maxAge = maxAge || this.maxAge
    this.port = port || this.port
    this.stream = stream || this.stream
    this.plugins = plugins || this.plugins

    // resolve paths
    this.serve = resolve(this.serve)
    this.bundle = resolve(this.bundle)
    this.manifest = resolve(this.manifest)
    this.template = resolve(this.template)
    this.webpack = resolve(this.webpack)

    this.renderer = !!this.serve && !!this.bundle && !!this.manifest && !!this.template
    this.universalRenderer = this.plugins.length > 0
  }
}
