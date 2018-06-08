
export type Widget = {
  name: string,
  type: string,
  value: any
}

export enum ACFMode {
  Strict = 'STRICT'
}

export type ACFOptions = {
  mode?: ACFMode
}

export default class ACF {
  static version: string

  public app: any
  public apps: Array<any>
  public mode: ACFMode = ACFMode.Strict

  constructor(public options: ACFOptions = {}) {
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

ACF.version = '__VERSION__'

export * from './loader'
export * from './query'
export * from './types'
