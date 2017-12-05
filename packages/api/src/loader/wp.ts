import { GraphQLContext } from 'graphql'
import { Loader } from './loader'

// posts loader
export class WP extends Loader {

  // path to use in posts
  public static Posts = '/posts'
  public static Categories = '/categories'

  // fetch posts
  public async getPosts(ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, WP.Posts, args)
  }

  // get categories
  public async getCategories(ctx: GraphQLContext, ids: number[] = [], args = {}) {
    return Promise.all(ids.map(id => this._fetcher(ctx, [WP.Categories, id].join('/')), args))
  }

  // fetch category
  public async getCategory(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [WP.Categories, id].join('/'), args)
  }

}
