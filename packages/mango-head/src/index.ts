import { install } from './install'
import inBrowser from './utils/dom'

import TitleMixin from './mixins/title'
import TagsMixin from './mixins/tags'

export {
  TitleMixin,
  TagsMixin
}

export interface MangoHeadOptions {
}

export default class MangoHead {
  static install: (Vue) => void
  static version: string

  public app: any
  public apps: Array<any>

  constructor(public options: MangoHeadOptions = {}) {
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

MangoHead.install = install
MangoHead.version = '__VERSION__'

if (inBrowser && window.Vue) {
  window.Vue.use(MangoHead)
}
