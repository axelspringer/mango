import { Component } from 'vue'
import { RouteConfig } from 'vue-router/types'

declare namespace MangoRouter {
  type ResolverFunc = (cmp: Component) => Component
  type Name = String
  type Option = 'name'
    | 'components'
    | 'redirect'
    | 'props'
    | 'alias'
    | 'children'
    | 'beforeEnter'
    | 'meta'
    | 'caseSensitive'
    | 'pathToRegexpOptions'
    | 'as'
    | 'guard'
    | 'prefix'

  interface Options {
  }
}

declare class Route {
  public cmp: Component
  public config: RouteConfig

  constructor(cmp: Component, config: RouteConfig)

  public static path: String
  public static default: any
}

declare class Router {
  public options: MangoRouter.Options

  constructor(options?: MangoRouter.Options)

  static install: (Vue) => void
  static version: string

  public resolver: MangoRouter.ResolverFunc

  public init(app: any)

  public language(cmp: Component): Router
  public home(cmp: Component): Router
  public category(cmp: Component): Router
  public day(cmp: Component): Router
  public month(cmp: Component): Router
  public post(cmp: Component): Router
  public tag(cmp: Component): Router
  public year(cmp: Component): Router
  public custom(cmp: Component, path: string, config: any): Router

  public all(): RouteConfig[]
}

export default Router


