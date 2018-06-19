
import { inBrowser } from './utils/dom'
import Router from './router'

export default Router

if (inBrowser && window.Vue) {
  window.Vue.use(Router)
}
