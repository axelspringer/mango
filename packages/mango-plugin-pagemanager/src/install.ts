import { registerComponents } from './utils/plugins'
// import { isDef } from './utils/def'
import mixin from './mixin'
import PageManagerRenderer from './components/renderer'

export let _Vue

export function install(Vue) {

  _Vue = Vue

  if (install.prototype.installed && _Vue === Vue) {
    return
  }

  // register component
  registerComponents(Vue, {
    'pagemanager-renderer': PageManagerRenderer
  })

  install.prototype.installed = true

  Object.defineProperty(Vue.prototype, '$pagemanager', {
    get() { return this._pagemanager }
  })

  Vue.mixin(mixin)

  // use object-based merge strategy
  const strats = Vue.config.optionMergeStrategies
  strats.i18n = strats.methods

}
