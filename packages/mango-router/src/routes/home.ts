import Route from '../route'
import Path from '../path'

export default class Home extends Route {
  public static path = Path.Home
  public static default = {
    name: 'home'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Home.default, config))
  }
}
