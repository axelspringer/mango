import { PageManager, PageManagerLanguage } from './types'
const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql')

export default {
  pageManagerHome: {
    type: PageManager,
    description: 'Returns the PageManager block of the home',
    args: {
      language: {
        description: 'The language to return the PageManager blocks for',
        type: GraphQLString
      },
      block_name: {
        description: 'The block name, which result should be returned',
        type: GraphQLString
      },
      block_id: {
        description: 'The block id (order id), which result should be returned',
        type: GraphQLInt
      },
      page: {
        description: 'The current page number for pagination',
        type: GraphQLInt
      },
      year: {
        description: 'The year to return the posts for',
        type: GraphQLInt
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getPageManagerHome(ctx, args.language, args)
  },
  pageManagerCategory: {
    type: PageManager,
    args: {
      id: {
        type: GraphQLInt
      },
      language: {
        description: 'The language to return the PageManager blocks for',
        type: GraphQLString
      },
      block_name: {
        description: 'The block name, which result should be returned',
        type: GraphQLString
      },
      block_id: {
        description: 'The block id (order id), which result should be returned',
        type: GraphQLInt
      },
      page: {
        description: 'The current page number for pagination',
        type: GraphQLInt
      },
      year: {
        description: 'The year to return the posts for',
        type: GraphQLInt
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getPageManagerCategories(ctx, args.id, args)
  },
  pageManagerTag: {
    type: PageManager,
    args: {
      id: {
        type: GraphQLInt
      },
      language: {
        type: GraphQLString
      },
      block_name: {
        description: 'The block name, which result should be returned',
        type: GraphQLString
      },
      block_id: {
        description: 'The block id (order id), which result should be returned',
        type: GraphQLInt
      },
      page: {
        description: 'The current page number for pagination',
        type: GraphQLInt
      },
      year: {
        description: 'The year to return the posts for',
        type: GraphQLInt
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getPageManagerTags(ctx, args.id, args)
  },
  pageManagerPage: {
    type: PageManager,
    args: {
      id: {
        type: GraphQLInt
      },
      language: {
        type: GraphQLString
      },
      block_name: {
        description: 'The block name, which result should be returned',
        type: GraphQLString
      },
      block_id: {
        description: 'The block id (order id), which result should be returned',
        type: GraphQLInt
      },
      page: {
        description: 'The current page number for pagination',
        type: GraphQLInt
      },
      year: {
        description: 'The year to return the posts for',
        type: GraphQLInt
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getPageManagerPages(ctx, args.id, args)
  },
  pageManagerPost: {
    type: PageManager,
    args: {
      id: {
        type: GraphQLInt
      },
      language: {
        type: GraphQLString
      },
      block_name: {
        description: 'The block name, which result should be returned',
        type: GraphQLString
      },
      block_id: {
        description: 'The block id (order id), which result should be returned',
        type: GraphQLInt
      },
      page: {
        description: 'The current page number for pagination',
        type: GraphQLInt
      },
      year: {
        description: 'The year to return the posts for',
        type: GraphQLInt
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
      },
      block_name: {
        description: 'The block name, which result should be returned',
        type: GraphQLString
      },
      block_id: {
        description: 'The block id (order id), which result should be returned',
        type: GraphQLInt
      },
      page: {
        description: 'The current page number for pagination',
        type: GraphQLInt
      },
      year: {
        description: 'The year to return the posts for',
        type: GraphQLInt
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getPageManagerGlobal(ctx, args.section, args.language, args)
  },
  pageManagerLanguages: {
    type: new GraphQLList(PageManagerLanguage),
    resolve: (_root, args, ctx) => ctx.loader.getPageManagerLanguages(ctx, args)
  }
}
