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
      return this._pageblock && this._pageblock.result ? this._pageblock.result : undefined
    }
  });

  Object.defineProperty(Vue.prototype, '$blockName', {
    get: function get() {
      return this._pageblock && this._pageblock.name ? this._pageblock.name : undefined
    }
  });

  Object.defineProperty(Vue.prototype, '$blockResult', {
    get: function get() {
      return this._pageblock && this._pageblock.result ? this._pageblock.result : undefined
    }
  });

  Object.defineProperty(Vue.prototype, '$blockIndex', {
    get: function get() {
      return this._pageblock && this._pageblock.index !== undefined ? this._pageblock.index : undefined
    }
  });

  Object.defineProperty(Vue.prototype, '$blockPageType', {
    get: function get() {
      return this._pageblock && this._pageblock.page_type ? this._pageblock.page_type : undefined
    }
  });

  // use object-based merge strategy
  const strats = Vue.config.optionMergeStrategies
  strats.pagemanager = strats.methods
}
