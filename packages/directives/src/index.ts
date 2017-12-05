import VuepressPosts from './components/vuepressPosts.vue'

import Promise from 'core-js/es6/promise'

// map Promise, if not is there
if (!window.Promise) {
  window.Promise = Promise
}

// install directives
export function install(Vue) {
  Vue.component('vuepress-posts', VuepressPosts)
}

// default export prosts
export default {
  VuepressPosts,
  install
}
