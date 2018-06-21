import { install } from './install'
import { inBrowser } from './utils/dom'
import { Component } from 'vue/types'

export enum PageManagerBlockTypes {
  SelectedArticles = 'selected_articles'
}

export type Widget = {
  name: string,
  type: string,
  value: any
}

export type PageManagerBlock = {
  component: string,
  pageBlock: Component,
  result: Widget[],
  page_type: string
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

if (inBrowser && window.Vue) {
  window.Vue.use(PageManager)
}
