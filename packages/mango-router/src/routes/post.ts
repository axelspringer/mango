import Route from '../route'
import Path from '../path'

export default class Post extends Route {
  public static path = Path.Post
  public static default = {
    name: 'post'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Post.default, config))
  }
}
