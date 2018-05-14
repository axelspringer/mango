import { resolve } from '../helpers'
import { createBundleRenderer } from 'vue-server-renderer'

export default (bundle, template, options) => {
  // tslint:disable max-line-length
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
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
