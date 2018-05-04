import { NavMenuType, NavMenuLocation } from './types'
const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql')

export default () => {
  return {
    menu: {
      type: NavMenuType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (_, args, ctx) => ctx.loader.getNavMenu(ctx, args.id)
    },
    menuLocation: {
      type: NavMenuType,
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve: (_, args, ctx) => ctx.loader.getNavLocation(ctx, args.name)
    },
    menuLocations: {
      type: new GraphQLList(NavMenuLocation),
      resolve: (_root, _args, ctx) => ctx.loader.getNavLocations(ctx)
    },
  }
}
