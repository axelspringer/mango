import { GraphQLString, GraphQLList, GraphQLInt } from 'graphql'
import { PostType } from './postType'
import { SettingsType } from './settingsType'
import { NavMenuType, NavMenuLocation } from './navType'

export const defaultQuery = {
  posts: {
    type: new GraphQLList(PostType),
    args: {
      lang: {
        type: GraphQLString
      }
    },
    resolve: (_, args, ctx) => ctx.loader.getPosts(ctx, args)
  },
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
  settings: {
    type: SettingsType,
    resolve: (_root, _args, ctx) => ctx.loader.getSettings(ctx)
  }
}


