import { registerComponent } from './utils/plugins'

export let _Vue

export function install(Vue) {

  _Vue = Vue

  if (this.install.installed && _Vue === Vue) {
    return
  }

  // register component
  // registerComponent(Vue)

  this.install.installed = true
}
