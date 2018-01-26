import { GraphQLContext } from 'graphql'
import { Loader } from './loader'

export enum API {
  Posts = '/wp/v2/posts',
  Categories = '/wp/v2/categories',
  Users = '/wp/v2/users',
  Settings = '/wp/v2/settings',
  NavMenu = '/mango/v1/nav/menus',
  NavItems = '/mango/v1/nav/items',
  NavLocations = '/mango/v1/nav/locations'
}

// posts loader
export class WP extends Loader {

  // fetch posts
  public async getPosts(ctx: GraphQLContext, args = {}) {
    console.log('test')
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

  // fetch nav menus
  public async getNavMenu(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.NavMenu, id].join('/'), args)
  }

  // fetch nav menu items
  public async getNavItems(ctx: GraphQLContext, id: number, args = {}) {
    return this._fetcher(ctx, [API.NavItems, id].join('/'), args)
  }

  // fetch settings
  public async getSettings(ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, API.Settings, args)
  }

  // fetch nav location
  public async getNavLocation(ctx: GraphQLContext, name: string, args = {}) {
    const menuId = await this._fetcher(ctx, [API.NavLocations, name].join('/'), args)
    return menuId === null ? null : this.getNavMenu(ctx, menuId, args) // this is a bit trivial
  }

  // fetch nav locations
  public async getNavLocations(ctx: GraphQLContext, args = {}) {
    const res = await this._fetcher(ctx, API.NavLocations, args) // get locations
    const locations = []
    for (const location in res) { // parse locations to a suitable
      locations.push({ // map to new object
        name: location,
        id: res[location]
      })
    }
    return locations
  }

}
