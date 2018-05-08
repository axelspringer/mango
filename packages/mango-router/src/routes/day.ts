import Route from '../route'
import Path from '../path'

export default class Day extends Route {
  public static path = Path.Day
  public static default = {
    name: 'day'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Day.default, config))
  }
}
