import { Response } from './types'

export class Handler {

  public status = 200
  public statusText = 'OK'

  constructor(public url, public data) {
  }

  public is(url): boolean { // this is a simple match
    return url === this.url
  }

  public handle(config) {
    return new Promise(resolve => resolve(new Response(this.status, this.data, config, config.headers, this.statusText)))
  }

  public reply(code = 200, statusText = 'OK') {
    this.status = code
    this.statusText = statusText
  }

}
