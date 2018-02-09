export default class MangoRouter {
  private _resolver = cmp => cmp
  private _routes = []

  public static DefaultDelimiter = '/'

  constructor() {
    // noop
  }

  set resolver(resFunc) {
    this._resolver = resFunc
  }

  get resolver() {
    return this._resolver
  }

  get routes() {
    return this._routes
  }

  custom(scheme) {

  }

  category() {

  }

  page() {

  }

  all() {
    return this._routes.map(route => route.config)
  }
}
