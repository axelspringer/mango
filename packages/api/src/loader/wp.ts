import { GraphQLContext } from 'graphql'
import { Loader } from './loader'

// posts loader
export class WP extends Loader {

  // path of usual wordpress endpoints
  public static Posts = '/wp/v2/posts'
  public static Categories = '/wp/v2/categories'
  public static Users = '/wp/v2/users'
  public static Settings = '/wp/v2/settings'

  // mango specific apis
  public static NavMenu = '/mango/v1/nav/menus'
  public static NavItems = '/mango/v1/nav/items'
  public static NavLocations = '/mango/v1/nav/locations'

  // page manager specific apis
  public static PageManagerCategories = '/page-manager/categories'
  public static PageManagerPosts = '/page-manager/posts'
  public static PageManagerPages = '/page-manager/pages'
  public static PageManagerTags = '/page-manager/tags'
  public static PageManagerSettings = '/page-manager/settings'

  // fetch posts
  public async getPosts(ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, WP.Posts, args)
  }

  // fetch categories
  public async getCategories(ctx: GraphQLContext, ids: number[] = [], args = {}) {
    return Promise.all(ids.map(id => this._fetcher(ctx, [WP.Categories, id].join('/')), args))
  }

  // fetch category
  public async getCategory(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [WP.Categories, id].join('/'), args)
  }

  // fetch users
  public async getUser(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [WP.Users, id].join('/'), args)
  }

  // fetch nav menus
  public async getNavMenu(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [WP.NavMenu, id].join('/'), args)
  }

  // fetch nav menu items
  public async getNavItems(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [WP.NavItems, id].join('/'), args)
  }

  // fetch settings
  public async getSettings(ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, WP.Settings, args)
  }

  // fetch page manager categories
  public async getPageManagerCategories(ctx: GraphQLContext, id: number, args = {}) {
    const result = await this._fetcher(ctx, [WP.PageManagerCategories, id].join('/'), args)
    // this is a hack for later
    return result.data
  }

  // fetch nav location
  public async getNavLocation(ctx: GraphQLContext, name: string, args = {}) {
    const menuId = await this._fetcher(ctx, [WP.NavLocations, name].join('/'), args)
    return menuId === null ? null : this.getNavMenu(ctx, menuId, args) // this is a bit trivial
  }

  // fetch nav locations
  public async getNavLocations(ctx: GraphQLContext, args = {}) {
    const res = await this._fetcher(ctx, WP.NavLocations, args) // get locations
    const locations = []
    for (const location in res) { // parse locations to a subitable
      locations.push({ // map to new object
        name: location,
        id: res[location]
      })
    }
    return locations
  }

}
