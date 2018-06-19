import { assert } from './utils/warn'
import { Component } from 'vue/types'
import Route from './route'
import { Home, Category, Tag, Year, Month, Day, Post, Language, Custom } from './routes'
import { install } from './install'

export default class Router {

  public options

  private _resolver = cmp => cmp
  private _routes = []
  private _url = ''

  static install: (Vue) => void
  static version: string

  public app: any
  public apps: Array<any>

  constructor(options = {}) {
    this.options = options || this.options
    this.app = null
    this.apps = []
  }

  public init(app: any /* Vue component instance */) {
    process.env.NODE_ENV !== 'production' && assert(
      Router.install.prototype.installed,
      `not installed. Make sure to call \`Vue.use(MangoRouter)\` ` +
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
    this.addRoute(new Home(cmp, this._url))

    return this // chain
  }

  public category(cmp: Component) {
    this.addUrl(Category.path)
    this.addRoute(new Category(cmp, this._url))

    return this // chain
  }

  public year(cmp: Component) {
    this.addUrl(Year.path)
    this.addRoute(new Year(cmp, this._url))

    return this // chain
  }

  public month(cmp: Component) {
    this.addUrl(Year.path)
    this.addRoute(new Month(cmp, this._url))

    return this // chain
  }

  public day(cmp: Component) {
    this.addUrl(Day.path)
    this.addRoute(new Day(cmp, this._url))

    return this // chain
  }

  public tag(cmp: Component) {
    this.addUrl(Tag.path)
    this.addRoute(new Tag(cmp, this._url))

    return this // chain
  }

  public post(cmp: Component) {
    this.addUrl(Post.path)
    this.addRoute(new Post(cmp, this._url))

    return this // chain
  }

  public language(cmp: Component) {
    this.addUrl(Language.path)
    this.addRoute(new Language(cmp, this._url))

    return this // chain
  }

  public custom(cmp: Component, path: string, config = {}) {
    this.addRoute(new Custom(cmp, this._url.concat(path), config))

    return this
  }

  public all() {
    return this._routes.map(route => route.config)
  }

  public addRoute(route: Route) {
    this.routes.push(route)
  }

  public addUrl(url: string) {
    return this._url = this._url.concat(url)
  }
}

Router.install = install
Router.version = '__VERSION__'
