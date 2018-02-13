import { Component } from 'vue/types'
import { Route, Home, Category, Tag, Year, Month, Day, Post } from './route'

export default class Router {

  private _resolver = cmp => cmp
  private _routes = []
  private _url = ''

  constructor() {
    // noop
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
