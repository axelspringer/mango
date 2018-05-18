import { GraphQLContext } from 'graphql'
import { PostArguments } from './args'
import Loader from './loader'
import API from './api'

// posts loader
export default class WP extends Loader {

  // fetch posts
  public async getPosts(ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, API.Posts, args)
  }

  // fetch post
  public async getPost(ctx: GraphQLContext, args: PostArguments = {}) {
    return args.permalink
      ? this.getPostByPermalink(ctx, args.permalink, args)
      : this._fetcher(ctx, [API.Posts, args.id].join('/'), args)
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

  // fetch terms
  public async getTerms(ctx: GraphQLContext, ids: number[] = [], args = {}) {
    return Promise.all(ids.map(id => this._fetcher(ctx, [API.Terms, id].join('/')), args))
  }

  // fetch tags
  public async getTags(ctx: GraphQLContext, ids: number[] = [], args = {}) {
    return Promise.all(ids.map(id => this._fetcher(ctx, [API.Tags, id].join('/')), args))
  }

  // fetch media
  public async getMedia(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.Media, id].join('/'), args)
  }

  public async getPostByPermalink(ctx: GraphQLContext, permalink: string, args = {}) {
    const result = await this._fetcher(ctx, API.PostByPermalink + permalink, args)
    return result;
  }

  public async getCategoryByPermalink(ctx: GraphQLContext, permalink: string, args = {}) {
    const result = await this._fetcher(ctx, API.CategoryByPermalink + permalink, args)
    return result;
  }

}
