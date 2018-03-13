import 'babel-polyfill'

import { install } from './install'
import { inBrowser } from './utils/dom'
import { Component } from 'vue/types'
import { assert } from './utils/warn'

export enum PageManagerBlockTypes {
  SelectedArticles = 'selected_articles'
}

export type PageManagerBlock = {
  component: string,
  pageBlock: Component
}

export enum PageManagerMode {
  Strict = 'STRICT'
}

export type PageManagerOptions = {
  blocks?: PageManagerBlock[],
  mode?: PageManagerMode,
}

export default class PageManager {
  static install: (Vue) => void
  static version: string

  public app: any
  public apps: Array<any>
  public mode: PageManagerMode = PageManagerMode.Strict

  constructor(public options: PageManagerOptions = {}) {
    this.app = null
    this.apps = []

    if (options.mode) {
      this.mode = options.mode
    }
  }

  public init(app: any /* Vue component instance */) {
    process.env.NODE_ENV !== 'production' && assert(
      PageManager.install.prototype.installed,
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
}

PageManager.install = install
PageManager.version = '__VERSION__'

export * from './loader'
export * from './mock'
export * from './query'
export * from './types'
export * from './components/renderer'

if (inBrowser && window.Vue) {
  window.Vue.use(PageManager)
}
