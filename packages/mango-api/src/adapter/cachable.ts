export default class Cachable {

  public data
  public status
  public statusText
  public config
  public headers
  public request
  public timestamp

  constructor(
    res
  ) {
    this.data = res.data
    this.status = res.status
    this.statusText = res.statusText
    this.headers = res.headers
    this.timestamp = res.timestamp || Date.now().toString()
  }
}
