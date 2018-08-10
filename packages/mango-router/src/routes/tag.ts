import Route from '../route'
import Path from '../path'

export default class Tag extends Route {
  public static path = Path.Tag
  public static default = {
    name: 'tag'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Tag.default, config))
  }
}
