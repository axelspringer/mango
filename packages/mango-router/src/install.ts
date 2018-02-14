import { registerComponents } from './utils/plugins'
// import { isDef } from './utils/def'
import mixin from './mixin'
import HomeProvider from './provider/home'
import DayProvider from './provider/day'
import MonthProvider from './provider/month'
import YearProvider from './provider/year'
import TagProvider from './provider/tag'
import PostProvider from './provider/post'


export let _Vue

export function install(Vue) {

  _Vue = Vue

  if (install.prototype.installed && _Vue === Vue) {
    return
  }

  // register components
  registerComponents(Vue, {
    'home-provider': HomeProvider
  })

  registerComponents(Vue, {
    'day-provider': DayProvider
  })

  registerComponents(Vue, {
    'month-provider': MonthProvider
  })

  registerComponents(Vue, {
    'year-provider': YearProvider
  })

  registerComponents(Vue, {
    'tag-provider': TagProvider
  })

  registerComponents(Vue, {
    'post-provider': PostProvider
  })

  install.prototype.installed = true

  // Object.defineProperty(Vue.prototype, '$pagemanager', {
  //   get() { return this._pagemanager }
  // })

  // Object.defineProperty(Vue.prototype, '$pageblock', {
  //   get() { return this._pageblock }
  // })

  Vue.mixin(mixin())

  // use object-based merge strategy
  const strats = Vue.config.optionMergeStrategies
  strats.router = strats.methods
}
