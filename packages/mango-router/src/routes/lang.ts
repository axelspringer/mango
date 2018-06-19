import Route from '../route'
import Path from '../path'

export default class Language extends Route {
  public static path = Path.Language
  public static default = {
    name: 'lang'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Language.default, config))
  }
}
