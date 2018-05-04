import { PageManagerBlock, PageManager, PageManagerLanguage } from './types'
const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql')

export default () => {
  return {
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
    },
    pageManagerGlobal: {
      type: PageManager,
      args: {
        language: {
          type: GraphQLString
        },
        section: {
          type: GraphQLString
        }
      },
      resolve: (_root, args, ctx) => ctx.loader.getPageManagerGlobal(ctx, args.section, args.language, args)
    },
    pageManagerLanguages: {
      type: new GraphQLList(PageManagerLanguage),
      resolve: (_root, args, ctx) => ctx.loader.getPageManagerLanguages(ctx, args)
    }
  }


}
