import { NavMenuType, NavMenuLocation } from './types'
const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql')

export default {
  menu: {
    type: NavMenuType,
    args: {
      id: {
        type: GraphQLInt
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getNavMenu(ctx, args.id)
  },

  menuLocation: {
    type: NavMenuType,
    args: {
      name: {
        type: GraphQLString
      },
      language: {
        type: GraphQLString
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getNavLocation(ctx, args.name, args)
  },

  menuLocations: {
    type: new GraphQLList(NavMenuLocation),
    args: {
      language: {
        type: GraphQLString
      },
    },
    resolve: (_root, args, ctx) => ctx.loader.getNavLocations(ctx, args)
  },
}
