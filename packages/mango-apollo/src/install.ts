// import { registerComponents } from './utils/plugins'
// import { isDef } from './utils/def'
import mixin from './mixin'


export let _Vue

export function install(Vue) {

  _Vue = Vue

  if (install.prototype.installed && _Vue === Vue) {
    return
  }

  // register components
  // registerComponents(Vue, {
  //   'home-provider': HomeProvider
  // })

  install.prototype.installed = true

  Object.defineProperty(Vue.prototype, '$apollo', {
    get() { return this._apollo }
  })

  // Object.defineProperty(Vue.prototype, '$pageblock', {
  //   get() { return this._pageblock }
  // })

  Vue.mixin(mixin())

  // use object-based merge strategy
  const strats = Vue.config.optionMergeStrategies
  strats.apollo = strats.methods
}
