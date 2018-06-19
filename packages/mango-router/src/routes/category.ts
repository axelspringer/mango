import Route from '../route'
import Path from '../path'

export default class Category extends Route {
  public static path = Path.Category
  public static default = {
    name: 'category'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}
