import { GraphQLContext } from 'graphql'
import { GetPost, GetPostPermalink, GetCustomizer, ListPosts, ListCategories, ListPost, ListTags, ListTaxonomies, ListPages } from './args'
import Loader from './loader'
import { Type } from './response'
import API from './api'

// posts loader
export default class WP extends Loader {

  // fetch posts
  public async getPosts(ctx: GraphQLContext, id: number, args: ListPosts = {}) {
    return this._fetcher(ctx, !id ? API.Posts : [API.Posts, id].join('/'), args)
  }

  // fetch category
  public async getCategory(ctx: GraphQLContext, id: number, args: ListCategories = {}, type: Type = 'Array') {
    const res = await this._fetcher(ctx, !id ? API.Categories : [API.Categories, id].join('/'), args)
    console.log(res)
    return type === 'Array' ? Array.isArray(res) ? res : res !== null ? [res] : res : Array.isArray(res) && res.length === 1 ? res[0] : res
  }

  // fetch categories
  public async getCategories(ctx: GraphQLContext, ids: [number], args: ListCategories = {}) {
    const result = await Promise.all([...ids.map(id => this.getCategory(ctx, id, args, 'Object'))])
    console.log(result)
    return result
  }

  // fetch posts
  public async getPolylangPosts(ctx: GraphQLContext, translations: Object, args: ListPosts = {}) {
    return Promise.all([...Object.keys(translations).map(trans => this.getPost(ctx, translations[trans], args))])
  }

  // fetch posts
  public async getPolylangCategories(ctx: GraphQLContext, translations: Object, args: ListPosts = {}) {
    return Promise.all([...Object.keys(translations).map(trans => this.getCategory(ctx, translations[trans], args))])
  }

  // fetch posts
  public async getPolylangPages(ctx: GraphQLContext, translations: Object, args: ListPosts = {}) {
    return Promise.all([...Object.keys(translations).map(trans => this.getPost(ctx, translations[trans], args))])
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
  public async getPages(ctx: GraphQLContext, id: number, args: ListPages = {}) {
    return this._fetcher(ctx, !id ? API.Pages : [API.Pages, id].join('/'), args)
  }

  // fetch settings
  public async getSettings(ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, API.Settings, args)
  }

  // fetch terms
  public async getTaxonomies(ctx: GraphQLContext, id: number, args: ListTaxonomies = {}) {
    return this._fetcher(ctx, !id ? API.Taxonomies : [API.Taxonomies, id].join('/'), args)
  }

  // fetch tag
  public async getTag(ctx: GraphQLContext, id: number, args: ListTags = {}, type: Type = 'Array') {
    const res = await this._fetcher(ctx, !id ? API.Tags : [API.Tags, id].join('/'), args)
    return type === 'Array' ? Array.isArray(res) ? res : res !== null ? [res] : res : Array.isArray(res) && res.length === 1 ? res[0] : res
  }

  // fetch tags
  public async getTags(ctx: GraphQLContext, ids: [number], args: ListTags = {}) {
    return Promise.all([...ids.map(id => this.getTag(ctx, id, args))])
  }

  // fetch media
  public async getMedia(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.Media, id].join('/'), args)
  }

  // fetch a post by permalink
  public async getPost(ctx: GraphQLContext, id: number, args: GetPost = {}) {
    return this._fetcher(ctx, !id ? API.Post : [API.Post, id].join('/'), args)
  }

  // fetch a post by permalink
  public async getPostPermalink(ctx: GraphQLContext, args: GetPostPermalink = {}) {
    return this._fetcher(ctx, API.PostPermalink, args)
  }

  // fetch customizer settings
  public async getCustomizer(ctx: GraphQLContext, args: GetCustomizer = {}) {
    return this._fetcher(ctx, API.Customizer, args)
  }
}
