import { GraphQLContext } from 'graphql'
import { Loader } from './loader'
import { regeneratorRuntime } from 'regenerator-runtime'

export enum API {
  Posts = '/wp/v2',
  Categories = '/wp/v2/categories',
  Users = '/wp/v2/users',
  Settings = '/wp/v2/settings',
  Terms = '/wp/v2/tags',
  Tags = '/wp/v2',
  Media = '/wp/v2/media',
  Pages = '/wp/v2/pages',
  PostByPermalink = '/mango/v1/posts/post-by-permalink?permalink=',
  CategoryByPermalink = '/mango/v1/categories/category-by-permalink?permalink='
}
type ArgsLimit = {
  id: number;
  offset?: number;
  limit?: number;
  exclude?: number[],
  type?: string;
}
type ArgsPermalink = {
  permalink: string;
  type?: string;
}
type ArgsTag = {
  tags: number[];
  type?: string;
}
// posts loader
export class WP extends Loader {

  // fetch posts
  public async getPosts(ctx: GraphQLContext, args: ArgsLimit) {
    let url = this.getPostUrlByType(args)
    return this._fetcher(ctx, this.getUrlLimited(url, args), args)
  }
  // fetch postlist by ids
  public async getPostListById(ctx: GraphQLContext, ids: number[], args: ArgsLimit) {
    let url = this.getPostUrlByType(args)
    return Promise.all(ids.map(id => this._fetcher(ctx, [url, id].join('/')), args))
  }

  public async getPostListByCategoryId(ctx: GraphQLContext, args: ArgsLimit) {
    let url = this.getPostUrlByType(args)
    url = [url, 'categories=' + args.id].join('?')
    url = this.getUrlLimited(url, args)
    return this._fetcher(ctx, url)
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
  public async getTags(ctx: GraphQLContext, args: ArgsTag) {
    let url = this.getTagUrlByType(args)
    let ids = (args.type === 'tags') ? args.tags : args[args.type + '_tags']
    ids = ids || []
    return Promise.all(ids.map(id => this._fetcher(ctx, [url, id].join('/')), args))
  }

  // fetch media
  public async getMedia(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.Media, id].join('/'), args)
  }

  public async getPostByPermalink(ctx: GraphQLContext, permalink: string, args = {}) {
    return await this._fetcher(ctx, API.PostByPermalink + permalink, args)
  }

  public async getCategoryByPermalink(ctx: GraphQLContext, args: ArgsPermalink) {
    let url = API.CategoryByPermalink + args.permalink
    const result = await this._fetcher(ctx, url, args)
    return result;
  }

  private getUrlLimited(url: string, args: ArgsLimit): string {
    url += (url.indexOf('?') > 0) ? '&' : '?'
    url = url + 'offset=' + ((args.offset === null || args.offset === undefined) ? 0 : args.offset)
    if (args.limit !== null && args.limit !== undefined) {
      url = url + '&per_page=' + args.limit
    }
    if (args.exclude !== null && args.exclude !== undefined) {
      url = url + '&exclude=' + args.exclude.toString()
    }
    return url
  }

  private getPostUrlByType(args: ArgsLimit) {
    const type = (args.type === undefined) ? 'posts' : args.type
    return [API.Posts, type].join('/')
  }

  private getTagUrlByType(args: ArgsTag) {
    const type = (args.type === undefined) ? 'tags' : args.type + '_tags'
    return [API.Tags, type].join('/')
  }
}
