import { install } from './install'
import { inBrowser } from './utils/dom'
import { Component } from 'vue/types'

export type PageManagerBlock = {
  component: string,
  pageBlock: Component
}

export type PageManagerOptions = {
  blocks?: PageManagerBlock[]
}

export default class PageManager {
  static install: (Vue) => void
  static version: string

  constructor(public options: PageManagerOptions = {}) {

  }
}

PageManager.install = install
PageManager.version = '__VERSION__'

export * from './loader'
export * from './mock'
export * from './query'
export * from './types'

if (inBrowser && window.Vue) {
  window.Vue.use(PageManager)
}
