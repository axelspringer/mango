import title from './mixins/title'
import tags from './mixins/title'

export let _Vue

export function install(Vue) {
  if (install.prototype.installed && _Vue === Vue) {
    return
  }

  install.prototype.installed = true;

  _Vue = Vue;

  Vue.mixin(title)
  Vue.mixin(tags)
}
