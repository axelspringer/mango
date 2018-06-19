export default class Hashable {

  public method
  public params
  public url
  public data
  public headers

  constructor(req) {
    this.method = req.method
    this.params = req.params // this assignment is faster
    this.url = req.url
    this.data = req.data
    this.headers = req.headers
  }
}
