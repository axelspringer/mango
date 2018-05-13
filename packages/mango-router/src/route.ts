import { RouteConfig } from 'vue-router/types'
import { Component } from 'vue'

export default class Route {
  public cmp: Component
  public config: RouteConfig

  constructor(cmp, config: RouteConfig) {
    this.cmp = cmp || this.cmp
    this.config = config || this.config
    this.config.component = this.cmp || this.config.component
  }
}
