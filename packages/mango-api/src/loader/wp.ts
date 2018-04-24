import { GraphQLContext } from 'graphql'
import { Loader } from './loader'

export enum API {
  Posts = '/wp/v2/posts',
  Categories = '/wp/v2/categories',
  Tags = '/wp/v2/tags',
  Media = '/wp/v2/media',
  Users = '/wp/v2/users',
  Settings = '/wp/v2/settings',
  Pages = '/wp/v2/pages',
  PostByPermalink = '/mango/v1/posts/post-by-permalink'
}

// posts loader
export class WP extends Loader {

  // fetch posts
  public async getPosts(ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, API.Posts, args)
  }
  // fetch postlist by ids
  public async getPostListById(ctx: GraphQLContext, ids: number[], args = {}) {
    return Promise.all(ids.map(id => this._fetcher(ctx, [API.Posts, id].join('/')), args))
  }

  public async getPostListByCategoryId(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.Posts, 'categories=' + id].join('?'), args)
  }
  // fetch categories
  public async getCategories(ctx: GraphQLContext, ids: number[] = [], args = {}) {
    return Promise.all(ids.map(id => this._fetcher(ctx, [API.Categories, id].join('/')), args))
  }

  // fetch tags
  public async getTags(ctx: GraphQLContext, ids: number[] = [], args = {}) {
    return Promise.all(ids.map(id => this._fetcher(ctx, [API.Tags, id].join('/')), args))
  }

  // fetch category
  public async getCategory(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.Categories, id].join('/'), args)
  }

  // fetch image
  public async getImage(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.Media, id].join('/'), args)
  }

  // fetch users
  public async getUser(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.Users, id].join('/'), args)
  }

  // fetch page
  public async getPage(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.Pages, id].join('/'), args)
  }

  // fetch settings
  public async getSettings(ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, API.Settings, args)
  }
  public async getPostByPermalink(ctx: GraphQLContext, args = {}) {
    const result = await this._fetcher(ctx, API.PostByPermalink, args)
    return result;
  }
}
