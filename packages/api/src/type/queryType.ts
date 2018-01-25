import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql'
import { PostType } from './postType'
import { SettingsType } from './settingsType'
import { NavMenuType, NavMenuLocation } from './navType'
import { PageManagerBlock } from './pageManagerType'

export const WPQueryType = new GraphQLObjectType({
  name: 'WP',
  description: 'The root of all WordPress queries',
  fields: () => ({
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
    },
    pageManagerCategory: {
      type: new GraphQLList(PageManagerBlock),
      args: {
        id: {
          type: GraphQLInt
        },
        language: {
          type: GraphQLString
        }
      },
      resolve: (_root, args, ctx) => ctx.loader.getPageManagerCategories(ctx, args.id, args)
    },
    pageManagerTag: {
      type: new GraphQLList(PageManagerBlock),
      args: {
        id: {
          type: GraphQLInt
        },
        language: {
          type: GraphQLString
        }
      },
      resolve: (_root, args, ctx) => ctx.loader.getPageManagerTags(ctx, args.id, args)
    },
    pageManagerPage: {
      type: new GraphQLList(PageManagerBlock),
      args: {
        id: {
          type: GraphQLInt
        },
        language: {
          type: GraphQLString
        }
      },
      resolve: (_root, args, ctx) => ctx.loader.getPageManagerPages(ctx, args.id, args)
    },
    pageManagerPost: {
      type: new GraphQLList(PageManagerBlock),
      args: {
        id: {
          type: GraphQLInt
        },
        language: {
          type: GraphQLString
        }
      },
      resolve: (_root, args, ctx) => ctx.loader.getPageManagerPosts(ctx, args.id, args)
    }
  }),
})
