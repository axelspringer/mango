import PageManager from './index'
// import { isDef } from './utils/def'

// const registerInstance = (vm, callVal) => {
//   let i = vm.$options._parentVnode
//   if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
//     i(vm, callVal)
//   }
// }

export default {
  beforeCreate(): void {
    const options: any = this.$options
    options.pagemanager = options.pagemanager || (options.__pagemanager ? {} : null)

    // map pagemanager options
    if (options.pagemanager && options.pagemanager instanceof PageManager) {
      // map to chain
      this._pagemanager = options.pagemanager
      this._pagemanager.init(this)
    } else if (this.$root && this.$root.$pagemanager && this.$root.$pagemanager instanceof PageManager) {
      this._pagemanager = this.$root.$pagemanager
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof PageManager) {
      this._pagemanager = options.parent.$pagemanager
    }
  },

  beforeDestroy(): void {
    if (!this._pagemanager) { return }

    this._pagemanager = null
  }
}
