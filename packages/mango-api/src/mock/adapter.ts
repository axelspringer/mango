import { AxiosInstance, AxiosPromise } from 'axios'
import { Handler } from './handler'
import { AnyRequest, Response } from './types';
import HttpStatus from 'http-status-codes'
import { HttpMethods } from './types'

export class MockAdapter {

  private defaultAdapter

  public handlers: { [index: string]: any } = {}

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
  public addHandler(method, url, data, exact) {
    if (!this.handlers[method]) {
      this.handlers[method] = []
    }
    const newHandler = new Handler(url, data, exact)
    const search = this.handlers[method].findIndex(handler => handler.url === newHandler.url)
    if (search !== -1) {
      this.handlers[method][search] = newHandler
      return newHandler
    }

    this.handlers[method].push(newHandler)

    // return the handler
    return newHandler
  }

  // remove a handler
  public removeHandler(method, url) {
    if (!this.handlers[method]) { // just for safty
      this.handlers[method] = []
    }
    const search = this.handlers[method].findIndex(handler => handler.url === url)
    if (search !== -1) {
      return this.handlers[method].splice(search, 1)
    }

    return -1
  }

  // remove all handlers
  public removeAllHandlers() {
    const oldHandlers = this.handlers
    this.handlers = []

    return oldHandlers
  }

}
