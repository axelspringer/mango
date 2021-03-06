import {
  GetPost,
  GetPostPermalink,
  GetPermalink,
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
  public async getPosts(ctx, id: number, args: ListPosts = {}) {
    return this._fetcher(ctx, !id ? WP.Posts : [WP.Posts, id].join('/'), args)
  }

  // fetch category
  public async getCategory(ctx, id: number, args: ListCategories = {}, type: Type = 'Array') {
    const res = await this._fetcher(ctx, !id ? WP.Categories : [WP.Categories, id].join('/'), args)
    return type !== 'Array' ? Array.isArray(res) ? res.length === 1 ? res[0] : null : res : Array.isArray(res) ? res : res !== null ? [res] : null
  }

  // fetch categories
  public async getCategories(ctx, ids: [number], args: ListCategories = {}) {
    return await Promise.all([...ids.map(id => this.getCategory(ctx, id, args, 'Object'))])
  }

  // fetch posts
  public async getPolylangPosts(ctx, post: any, args: ListPosts = {}) {
    return Promise.all([...Object.keys(post.translations).map(trans => post.translations[trans] !== post.id ? this.getPost(ctx, post.translations[trans], args) : post)])
  }

  // fetch posts
  public async getPolylangCategories(ctx, cat: any, args: ListPosts = {}) {
    return Promise.all([...Object.keys(cat.translations).map(trans => cat.translations[trans] !== cat.id ? this.getCategory(ctx, cat.translations[trans], args, 'Object') : cat)])
  }

  // fetch posts
  public async getPolylangPages(ctx, page: any, args: ListPosts = {}) {
    return Promise.all([...Object.keys(page.translations).map(trans => page.translations[trans] !== page.id ? this.getPost(ctx, page.translations[trans], args) : page)])
  }

  // fetch posts
  public async getPolylangTags(ctx, tag: any, args: ListPosts = {}) {
    return Promise.all([...Object.keys(tag.translations).map(trans => tag.translations[trans] !== tag.id ? this.getTag(ctx, tag.translations[trans], args, 'Object') : tag)])
  }

  // fetch image
  public async getImage(ctx, id: number, args = {}) {
    return this._fetcher(ctx, [WP.Media, id].join('/'), args)
  }

  // fetch users
  public async getUser(ctx, id: number, args = {}) {
    return this._fetcher(ctx, [WP.Users, id].join('/'), args)
  }

  // fetch page
  public async getPages(ctx, id: number, args: ListPages = {}) {
    return await this._fetcher(ctx, !id ? WP.Pages : [WP.Pages, id].join('/'), args)
  }

  // fetch settings
  public async getSettings(ctx, args = {}) {
    return this._fetcher(ctx, WP.Settings, args)
  }

  // fetch terms
  public async getTaxonomies(ctx, id: number, args: ListTaxonomies = {}) {
    return this._fetcher(ctx, !id ? WP.Taxonomies : [WP.Taxonomies, id].join('/'), args)
  }

  // fetch tag
  public async getTag(ctx, id: number, args: ListTags = {}, type: Type = 'Array') {
    const res = await this._fetcher(ctx, !id ? WP.Tags : [WP.Tags, id].join('/'), args)
    return type !== 'Array' ? Array.isArray(res) ? res.length === 1 ? res[0] : null : res : Array.isArray(res) ? res : res !== null ? [res] : null
  }

  // fetch tags
  public async getTags(ctx, ids: [number], args: ListTags = {}) {
    return Promise.all([...ids.map(id => this.getTag(ctx, id, args, 'Object'))])
  }

  // fetch media
  public async getMedia(ctx, id: number, args = {}) {
    return this._fetcher(ctx, [WP.Media, id].join('/'), args)
  }

  // fetch a post by permalink
  public async getPost(ctx, id: number, args: GetPost = {}) {
    return this._fetcher(ctx, !id ? Mango.Post : [Mango.Post, id].join('/'), args)
  }

  // fetch a post by permalink
  public async getPostPermalink(ctx, args: GetPostPermalink = {}) {
    return this._fetcher(ctx, Mango.PostByPermalink, args)
  }

  // fetch an item to a permalink
  public async getPermalink(ctx, args: GetPermalink = {}) {
    return this._fetcher(ctx, Mango.Permalink, args)
  }

  // fetch customizer settings
  public async getCustomizer(ctx, args: GetCustomizer = {}) {
    return this._fetcher(ctx, Mango.Customizer, args)
  }

  // fetch media item
  public async getMediaItem(ctx, id: number, args = {}) {
    return this._fetcher(ctx, [Mango.Media, id].join('/'), args)
  }

  // fetch slugs
  public async getSlugs(ctx, args: ListSlugs = {}) {
    return this._fetcher(ctx, Mango.Slugs, args)
  }
}
