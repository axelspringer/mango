import { GraphQLContext } from 'graphql'
import { Loader } from './loader'

export enum API {
  Posts = '/wp/v2/posts',
  Categories = '/wp/v2/categories',
  Users = '/wp/v2/users',
  Settings = '/wp/v2/settings'
}

// posts loader
export class WP extends Loader {

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
