
import { assert } from './utils/warn'
import { inBrowser } from './utils/dom'
import { install } from './install'
import { Component } from 'vue/types'
import { Route, Home, Category, Tag, Year, Month, Day, Post } from './route'
import DayProvider from './provider/day'
import HomeProvider from './provider/home'
import MonthProvider from './provider/month'
import PostProvider from './provider/post'
import TagProvider from './provider/tag'
import YearProvider from './provider/year'

export type Options = {
}

class RouterPlugin {

  private _resolver = cmp => cmp
  private _routes = []
  private _url = ''

  static install: (Vue) => void
  static version: string

  public app: any
  public apps: Array<any>

  constructor(public options: Options = {}) {
    this.app = null
    this.apps = []
  }

  public init(app: any /* Vue component instance */) {
    process.env.NODE_ENV !== 'production' && assert(
      RouterPlugin.install.prototype.installed,
      `not installed. Make sure to call \`Vue.use(PageManager)\` ` +
      `before creating root instance.`
    )

    this.apps.push(app)

    // main app already initialized
    if (this.app) {
      return
    }

    this.app = app
  }

  set resolver(resFunc) {
    this._resolver = resFunc
  }

  get resolver() {
    return this._resolver
  }

  get routes() {
    return this._routes
  }

  public home(cmp: Component) {
    this._addRoute(new Home(cmp, this._url))

    return this // chain
  }

  public category(cmp: Component) {
    this._addUrl(Category.path)
    this._addRoute(new Category(cmp, this._url))

    return this // chain
  }

  public year(cmp: Component) {
    this._addUrl(Year.path)
    this._addRoute(new Year(cmp, this._url))

    return this // chain
  }

  public month(cmp: Component) {
    this._addUrl(Year.path)
    this._addRoute(new Month(cmp, this._url))

    return this // chain
  }

  public day(cmp: Component) {
    this._addUrl(Day.path)
    this._addRoute(new Day(cmp, this._url))

    return this // chain
  }

  public tag(cmp: Component) {
    this._addUrl(Tag.path)
    this._addRoute(new Tag(cmp, this._url))

    return this // chain
  }

  public post(cmp: Component) {
    this._addUrl(Post.path)
    this._addRoute(new Category(cmp, this._url))

    return this // chain
  }

  public all() {
    return this._routes.map(route => route.config)
  }

  private _addRoute(route: Route) {
    this.routes.push(route)
  }

  private _addUrl(url: string) {
    return this._url = this._url.concat(url)
  }
}

RouterPlugin.install = install
RouterPlugin.version = '__VERSION__'

export default new RouterPlugin()

export {
  DayProvider,
  HomeProvider,
  MonthProvider,
  PostProvider,
  RouterPlugin,
  TagProvider,
  YearProvider
}

if (inBrowser && window.Vue) {
  window.Vue.use(Plugin)
}
