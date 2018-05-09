import { registerComponents } from './utils/plugins'
import mixin from './mixin'
import PageManagerRenderer from './components/renderer'

export let _Vue

export function install(Vue) {
  if (install.prototype.installed && _Vue === Vue) {
    return
  }

  install.prototype.installed = true;

  _Vue = Vue;

  // register component
  registerComponents(Vue, {
    'pagemanager-renderer': PageManagerRenderer
  });

  Vue.mixin(mixin(Vue))

  Object.defineProperty(Vue.prototype, '$pagemanager', {
    get: function get() {
      return this._pagemanager
    }
  });

  Object.defineProperty(Vue.prototype, '$pageblock', {
    get: function get() {
      return this._pageblock
    }
  });

  // use object-based merge strategy
  const strats = Vue.config.optionMergeStrategies
  strats.pagemanager = strats.methods
}
