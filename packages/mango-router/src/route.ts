import { RouteConfig } from 'vue-router/types'

export default class Route {
  constructor(public cmp, public config: RouteConfig) {
    this.config.component = this.cmp || this.config.component
  }
}
