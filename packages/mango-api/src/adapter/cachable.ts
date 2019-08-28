export default class Cachable {

  public data
  public status
  public statusText
  public config
  public request
  public timestamp

  constructor(
    res
  ) {
    this.data = res.data
    this.status = res.status
    this.statusText = res.statusText
    this.timestamp = res.timestamp || Date.now().toString()
  }
}
