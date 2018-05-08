import Route from '../route'
import Path from '../path'

export default class Year extends Route {
  public static path = Path.Year
  public static default = {
    name: 'year'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Year.default, config))
  }
}
