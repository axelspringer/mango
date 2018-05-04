const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql')
import { NavMenuType, NavMenuLocation } from './types'

export const Query = {
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
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getNavLocations(ctx, args)
  },
}
