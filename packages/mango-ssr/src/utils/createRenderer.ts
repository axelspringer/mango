import { resolve } from './path'
import { createBundleRenderer } from 'vue-server-renderer'
import * as LRU from 'lru-cache'
import Environment from '../env'

export default (bundle, template, options: any = {}) => {
  const cache = new LRU({
    max: 100,
    maxAge: 1000 * 60 // 60s
  })
  options = { ...options, cache, template, runInNewContext: false }

  if (Environment.Development) { // set base dir in dev
    options.basedir = resolve('./public')
  }

  // tslint:disable max-line-length
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, options)
}
