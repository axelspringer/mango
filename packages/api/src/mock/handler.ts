import { Response } from './types'
import * as HttpStatus from 'http-status-codes'

export class Handler {

  public status = HttpStatus.OK
  public statusText = HttpStatus.getStatusText(HttpStatus.OK)

  constructor(public url, public data, public exact = false) {
  }

  // test to handle
  public is(url): boolean { // this is a simple match
    return this.exact ? url === this.url : url.startsWith(this.url)
  }

  // called to handle a config
  public handle(config) {
    return new Promise(resolve => resolve(new Response(this.status, this.data, config, config.headers, this.statusText)))
  }

  // this is to reply with 200
  public reply(code = HttpStatus.OK, statusText = 'OK') {
    this.status = code
    this.statusText = statusText
  }

}
