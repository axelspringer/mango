export default class SSRContext {
  public url
  public rawHeaders
  public headers
  public methods

  constructor({ url, headers, rawHeaders, methods }) {
    this.url = url || this.url
    this.rawHeaders = rawHeaders || this.rawHeaders
    this.methods = methods || this.methods
    this.headers = headers || this.headers
  }
}
