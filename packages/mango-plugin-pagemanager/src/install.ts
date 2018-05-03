import { registerComponents } from './utils/plugins'
import mixin from './mixin'
import PageManagerRenderer from './components/renderer'

export let _Vue

export function install(Vue) {
  if (install.prototype.installed && _Vue === Vue) return

  _Vue = Vue

  // register component
  registerComponents(Vue, {
    'pagemanager-renderer': PageManagerRenderer
  })

  install.prototype.installed = true

  Object.defineProperty(Vue.prototype, '$pagemanager', {
    get() { return this._pagemanager }
  })

  Object.defineProperty(Vue.prototype, '$pageblock', {
    get() { return this._pageblock }
  })

  Vue.mixin(mixin(Vue))

  // use object-based merge strategy
  const strats = Vue.config.optionMergeStrategies
  strats.pagemanager = strats.methods
}
