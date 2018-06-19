import Route from '../route'

export default class Custom extends Route {
  public static default = {
    // noop
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Custom.default, config))
  }
}
