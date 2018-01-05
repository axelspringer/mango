import Vue from 'vue'

// construct Plugin
const MangoPlugin = {
  install(Vue: Vue) {
    if (this.installed) {
      return
    }

    this.installed = true
  }
}

// automatic install if added via script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MangoPlugin)
}

export default MangoPlugin
