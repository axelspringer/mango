export default class Hashable {

  public method
  public params
  public url
  public data

  constructor(obj) {
    this.method = obj.method
    this.params = obj.params // this assignment is faster
    this.url = obj.url
    this.data = obj.data
  }
}
