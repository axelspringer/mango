import { AxiosInstance, AxiosPromise } from 'axios'
import { HTTP } from './types'
import { Handler } from './handler'

export class MockAdapter {

  private defaultAdapter
  // private delayResponse = 0

  private handlers = {}

  constructor(public client: AxiosInstance, public options) {
    if (client) {
      this.defaultAdapter = client.defaults.adapter
      // this.delayResponse = options.delayResponse || 0
      this.client.defaults.adapter = this.adapter
      // define any
      this.handlers[HTTP.ANY] = options.defaultHandler || undefined
    }
  }

  public restore() {
    if (this.client) {
      this.client.defaults.adapter = this.defaultAdapter
    }
  }

  public adapter = (config): AxiosPromise => {
    for (let handler of this.handlers[config.method]) {
      if (handler.is(config.url)) {
        return handler.handle(config)
      }
    }

    if (this.handlers[HTTP.ANY]) {
      return this.handlers[HTTP.ANY].handle(config)
    }
    return new Promise((resolve) => resolve())
  }

  public get(url, data) {
    return this.addHandler(HTTP.GET, url, data)
  }

  private addHandler(method, url, data) {
    if (!this.handlers[method]) {
      this.handlers[method] = []
    }
    const handler = new Handler(url, data)
    this.handlers[method].push(handler)

    // return the handler
    return handler
  }

}
