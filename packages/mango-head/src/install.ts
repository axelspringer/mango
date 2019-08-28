import Context from './mixins/context/context'

export let _Vue

export function install(Vue) {
  if (install.prototype.installed && _Vue === Vue) {
    return
  }

  install.prototype.installed = true

  _Vue = Vue

  Vue.mixin(Context)
}
