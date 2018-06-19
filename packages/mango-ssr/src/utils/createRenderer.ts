import { resolve } from './path'
import { createBundleRenderer } from 'vue-server-renderer'
import * as LRU from 'lru-cache'

export default (bundle, template, options) => {
  // tslint:disable max-line-length
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, {
    ...options,
    template,
    cache: new LRU({
      max: 100,
      maxAge: 1000 * 60 // 60s
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./public'),
    // recommended for performance
    runInNewContext: false
  })
}
