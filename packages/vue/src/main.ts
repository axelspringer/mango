import { install } from './install'

interface MangoPluginOptions { }

export default class MangoPlugin {
  static install: (Vue) => void
  static version: string

  constructor(public options: MangoPluginOptions = {}) { }
}

MangoPlugin.install = install
MangoPlugin.version = '__VERSION__'

// automatic install if added via script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MangoPlugin)
}
