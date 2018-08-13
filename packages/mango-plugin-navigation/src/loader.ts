import { GraphQLContext } from 'graphql'
import API from './api'

export default {

  // fetch nav menus
  getNavMenu: async function (ctx: GraphQLContext, id: number, args = {}) {
    return this.job(ctx, [API.NavMenu, id].join('/'), args)
  },

  // fetch nav menu items
  getNavItems: async function (ctx: GraphQLContext, id: number, args = {}) {
    return this.job(ctx, [API.NavItems, id].join('/'), args)
  },

  // fetch nav location
  getNavLocation: async function (ctx: GraphQLContext, name: string, args = {}) {
    const menuId = await this.job(ctx, [API.NavLocations, name].join('/'), args)
    return menuId === null ? null : this.getNavMenu(ctx, menuId, args) // this is a bit trivial
  },

  // fetch nav locations
  getNavLocations: async function (ctx: GraphQLContext, args = {}) {
    const res = await this.job(ctx, API.NavLocations, args) // get locations
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
