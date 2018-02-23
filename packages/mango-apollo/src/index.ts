
import { assert } from './utils/warn'
import { inBrowser } from './utils/dom'
import { install } from './install'
import { ApolloFetch } from 'apollo-fetch'

export type Options = {
  client: ApolloFetch
}

export default class ApolloPlugin {

  static install: (Vue) => void
  static version: string

  public app: any
  public apps: Array<any>

  constructor(public options: Options) {
    this.app = null
    this.apps = []

    assert(this.options.client, `please provide a ApolloFetch instance`)


  }

  public init(app: any /* Vue component instance */) {
    process.env.NODE_ENV !== 'production' && assert(
      ApolloPlugin.install.prototype.installed,
      `not installed. Make sure to call \`Vue.use(ApolloPlugin)\` ` +
      `before creating root instance.`
    )

    this.apps.push(app)

    // main app already initialized
    if (this.app) {
      return
    }

    this.app = app
  }

}

ApolloPlugin.install = install
ApolloPlugin.version = '__VERSION__'

if (inBrowser && window.Vue) {
  window.Vue.use(ApolloPlugin)
}
