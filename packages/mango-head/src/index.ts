import { install } from './install'
import inBrowser from './utils/dom'

export default class Head {
  static install: (Vue) => void
  static version: string

  public app: any
  public apps: Array<any>

  constructor() {
    this.app = null
    this.apps = []
  }

  public init(app: any /* Vue component instance */) {
    this.apps.push(app)

    // main app already initialized
    if (this.app) {
      return
    }

    this.app = app
  }
}

Head.install = install
Head.version = '__VERSION__'

if (inBrowser && window.Vue) {
  window.Vue.use(Head)
}
