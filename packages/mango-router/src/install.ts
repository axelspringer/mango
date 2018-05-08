import mixin from './mixin'

export let _Vue

export function install(Vue) {
  _Vue = Vue

  if (install.prototype.installed && _Vue === Vue) {
    return
  }
  install.prototype.installed = true

  Vue.mixin(mixin())

  // use object-based merge strategy
  const strats = Vue.config.optionMergeStrategies
  strats.router = strats.methods
}
