import Route from '../route'
import Path from '../path'

export default class Month extends Route {
  public static path = Path.Month
  public static default = {
    name: 'month'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Month.default, config))
  }
}
