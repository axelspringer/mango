import { install } from './install'
import { inBrowser } from './util/dom'

export default class VueMango {
  static install: (Vue) => void
  static version: string

  constructor(options = {}) {
    let mode = options.mode || VueMango.Browser

    if (!inBrowser) {
      mode = MangoPluginMode.Server
    }

    this.mode = mode
  }
}

VueMango.install = install
VueMango.version = '__VERSION__'

// automatic install if added via script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueMango)
}
