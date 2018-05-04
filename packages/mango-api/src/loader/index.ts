import { GraphQLContext } from 'graphql'
import Loader from './loader'
import API from './api'

// posts loader
export default class WP extends Loader {

  // fetch posts
  public async getPosts(ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, API.Posts, args)
  }

  // fetch categories
  public async getCategories(ctx: GraphQLContext, ids: number[] = [], args = {}) {
    return Promise.all(ids.map(id => this._fetcher(ctx, [API.Categories, id].join('/')), args))
  }

  // fetch category
  public async getCategory(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.Categories, id].join('/'), args)
  }

  // fetch users
  public async getUser(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.Users, id].join('/'), args)
  }

  // fetch settings
  public async getSettings(ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, API.Settings, args)
  }

}
