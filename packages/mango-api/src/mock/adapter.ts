import { AxiosInstance, AxiosPromise } from 'axios'
import { Handler } from './handler'
import { AnyRequest, Response } from './types';
import HttpStatus from 'http-status-codes'
import { HttpMethods } from './types'

export class MockAdapter {

  private defaultAdapter
  // private delayResponse = 0

  private handlers: { [index: string]: any } = {}

  constructor(public client: AxiosInstance, public options) {
    if (client) {
      this.defaultAdapter = client.defaults.adapter
      // this.delayResponse = options.delayResponse || 0
      this.client.defaults.adapter = this.adapter
      // define any
      this.handlers[AnyRequest] = options.defaultHandler || undefined
    }
  }

  // restore default adapter
  public restore() {
    if (this.client) {
      this.client.defaults.adapter = this.defaultAdapter
    }
  }

  // adapter
  public adapter = (config): AxiosPromise => {
    for (let handler of this.handlers[config.method]) {
      if (handler.is(config.url.substr(config.baseURL.length))) {
        return handler.handle(config)
      }
    }

    if (this.handlers[AnyRequest]) {
      return this.handlers[AnyRequest].handle(config)
    }

    // return a default response
    return new Promise(resolve => resolve(new Response(HttpStatus.OK, {}, {}, {}, HttpStatus.getStatusText(HttpStatus.OK))))
  }

  // get
  public get(url, data, exact = false) {
    return this.addHandler(HttpMethods.GET, url, data, exact)
  }

  // add a handler
  private addHandler(method, url, data, exact) {
    if (!this.handlers[method]) {
      this.handlers[method] = []
    }
    const handler = new Handler(url, data, exact)
    this.handlers[method].push(handler)

    // return the handler
    return handler
  }

}