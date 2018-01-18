import * as path from 'path'
import * as express from 'express'
import * as compress from 'express-static-gzip'
import { Config } from './config'

export const isProd = process.env.NODE_ENV === 'production'
export const resolve = file => path.resolve(process.cwd(), file)
export const relative = file => path.relative(__dirname, file)
export const serve = (config: Config) => isProd
  ? compress(config.serve, {
    // evalute times on prod
    maxAge: config.cache && isProd ? 60 * 60 * 24 * 30 : 0,
    enableBrotli: true
  })
  : express.static(config.serve)

export const createRenderer = (bundle, template, options) => {
  // tslint:disable max-line-length
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return require('vue-server-renderer').createBundleRenderer(bundle, Object.assign(options, {
    template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./public'),
    // recommended for performance
    runInNewContext: false
  }))
}
