import { GraphQLContext } from 'graphql'
import {
  GetPost,
  GetPostPermalink,
  GetCustomizer,
  ListSlugs,
  ListPosts,
  ListCategories,
  ListTags,
  ListTaxonomies,
  ListPages
} from './args'
import Loader from './loader'
import { Type } from './response'
import { WP, Mango } from './api'

// posts loader
export default class WPLoader extends Loader {

  // fetch posts
  public async getPosts(ctx: GraphQLContext, id: number, args: ListPosts = {}) {
    return this._fetcher(ctx, !id ? WP.Posts : [WP.Posts, id].join('/'), args)
  }

  // fetch category
  public async getCategory(ctx: GraphQLContext, id: number, args: ListCategories = {}, type: Type = 'Array') {
    const res = await this._fetcher(ctx, !id ? WP.Categories : [WP.Categories, id].join('/'), args)
    return type !== 'Array' ? Array.isArray(res) ? res.length === 1 ? res[0] : null : res : Array.isArray(res) ? res : res !== null ? [res] : null
  }

  // fetch categories
  public async getCategories(ctx: GraphQLContext, ids: [number], args: ListCategories = {}) {
    return await Promise.all([...ids.map(id => this.getCategory(ctx, id, args, 'Object'))])
  }

  // fetch posts
  public async getPolylangPosts(ctx: GraphQLContext, translations: Object, args: ListPosts = {}) {
    return Promise.all([...Object.keys(translations).map(trans => this.getPost(ctx, translations[trans], args))])
  }

  // fetch posts
  public async getPolylangCategories(ctx: GraphQLContext, translations: Object, args: ListPosts = {}) {
    return Promise.all([...Object.keys(translations).map(trans => this.getCategory(ctx, translations[trans], args, 'Object'))])
  }

  // fetch posts
  public async getPolylangPages(ctx: GraphQLContext, translations: Object, args: ListPosts = {}) {
    return Promise.all([...Object.keys(translations).map(trans => this.getPost(ctx, translations[trans], args))])
  }

  // fetch posts
  public async getPolylangTags(ctx: GraphQLContext, translations: Object, args: ListPosts = {}) {
    return Promise.all([...Object.keys(translations).map(trans => this.getTag(ctx, translations[trans], args, 'Object'))])
  }

  // fetch image
  public async getImage(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [WP.Media, id].join('/'), args)
  }

  // fetch users
  public async getUser(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [WP.Users, id].join('/'), args)
  }

  // fetch page
  public async getPages(ctx: GraphQLContext, id: number, args: ListPages = {}) {
    return await this._fetcher(ctx, !id ? WP.Pages : [WP.Pages, id].join('/'), args)
  }

  // fetch settings
  public async getSettings(ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, WP.Settings, args)
  }

  // fetch terms
  public async getTaxonomies(ctx: GraphQLContext, id: number, args: ListTaxonomies = {}) {
    return this._fetcher(ctx, !id ? WP.Taxonomies : [WP.Taxonomies, id].join('/'), args)
  }

  // fetch tag
  public async getTag(ctx: GraphQLContext, id: number, args: ListTags = {}, type: Type = 'Array') {
    const res = await this._fetcher(ctx, !id ? WP.Tags : [WP.Tags, id].join('/'), args)
    return type !== 'Array' ? Array.isArray(res) ? res.length === 1 ? res[0] : null : res : Array.isArray(res) ? res : res !== null ? [res] : null
  }

  // fetch tags
  public async getTags(ctx: GraphQLContext, ids: [number], args: ListTags = {}) {
    return Promise.all([...ids.map(id => this.getTag(ctx, id, args, 'Object'))])
  }

  // fetch media
  public async getMedia(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [WP.Media, id].join('/'), args)
  }

  // fetch a post by permalink
  public async getPost(ctx: GraphQLContext, id: number, args: GetPost = {}) {
    return this._fetcher(ctx, !id ? Mango.Post : [Mango.Post, id].join('/'), args)
  }

  // fetch a post by permalink
  public async getPostPermalink(ctx: GraphQLContext, args: GetPostPermalink = {}) {
    return this._fetcher(ctx, Mango.Permalink, args)
  }

  // fetch customizer settings
  public async getCustomizer(ctx: GraphQLContext, args: GetCustomizer = {}) {
    return this._fetcher(ctx, Mango.Customizer, args)
  }

  // fetch media item
  public async getMediaItem(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [Mango.Media, id].join('/'), args)
  }

  // fetch slugs
  public async getSlugs(ctx: GraphQLContext, args: ListSlugs = {}) {
    return this._fetcher(ctx, Mango.Slugs, args)
  }
}
