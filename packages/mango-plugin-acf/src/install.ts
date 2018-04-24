import mixin from './mixin'

export let _Vue

export function install(Vue) {

  _Vue = Vue

  if (install.prototype.installed && _Vue === Vue) {
    return
  }


  install.prototype.installed = true

  Object.defineProperty(Vue.prototype, '$acf', {
    get() { return this._pagemanager }
  })


  Vue.mixin(mixin())

  // use object-based merge strategy
  const strats = Vue.config.optionMergeStrategies
  strats.pagemanager = strats.methods
}
