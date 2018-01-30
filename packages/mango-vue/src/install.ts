import { warn } from './util/log'
import mixin from './mixin'

export let _Vue

export function install(Vue) {

  const version = (Vue.version && Number(Vue.version.split('.')[0])) || -1

  if (this.install.installed && _Vue === Vue) {
    return
  }

  if (process.env.NODE_ENV !== 'production' && version < 2) {
    warn(`vue-i18n (${this.version}) need to use Vue 2.0 or later (Vue: ${Vue.version}).`)
    return
  }

  this.install.installed = true

  Vue.mixin(mixin)

  _Vue = Vue
}
