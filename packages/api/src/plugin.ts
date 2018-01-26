export class Plugin {

  public mock
  public query
  public loader

  constructor({ Mock, Query, Loader }) {
    this.mock = Mock
    this.query = Query
    this.loader = Loader
  }

}
