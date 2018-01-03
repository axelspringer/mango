import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql'
import { PostType } from './postType'
import { NavMenuType, NavMenuLocation } from './navType'

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all WordPress queries',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
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
    }
  }),
})
