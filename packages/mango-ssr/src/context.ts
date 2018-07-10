export default class SSRContext {
  public url
  public rawHeaders
  public headers
  public methods

  constructor(req) {
    // backwards compatibility
    const { url, headers, rawHeaders, methods }: any = req

    this.url = url || this.url
    this.rawHeaders = rawHeaders || this.rawHeaders
    this.methods = methods || this.methods
    this.headers = headers || this.headers
  }
}
