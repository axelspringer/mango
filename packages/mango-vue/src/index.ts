import { install } from './install'
import { inBrowser } from './utils/dom'
import { assert } from './utils/warn'

export type MangoOptions = {
}

export default class Mango {
  static install: (Vue) => void
  static version: string

  public app: any
  public apps: Array<any>

  constructor(public options: MangoOptions = {}) {
    this.app = null
    this.apps = []
  }

  public init(app: any /* Vue component instance */) {
    process.env.NODE_ENV !== 'production' && assert(
      Mango.install.prototype.installed,
      `not installed. Make sure to call \`Vue.use(Mango)\` ` +
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

Mango.install = install
Mango.version = '__VERSION__'

if (inBrowser && window.Vue) {
  window.Vue.use(Mango)
}
