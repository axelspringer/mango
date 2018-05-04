import { registerComponents } from './utils/plugins'
import mixin from './mixin'
import PageManagerRenderer from './components/renderer'

export function install(Vue) {
  // register component
  registerComponents(Vue, {
    'pagemanager-renderer': PageManagerRenderer
  })

  Vue.mixin(mixin(Vue))

  Vue.prototype.$pagemanager = function () {
    return this._pagemanager
  }

  Vue.prototype.$pageblock = function () {
    return this._pagemanager
  }

  // use object-based merge strategy
  const strats = Vue.config.optionMergeStrategies
  strats.pagemanager = strats.methods
}
