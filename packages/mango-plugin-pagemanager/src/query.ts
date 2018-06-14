import { PageManager, PageManagerLanguage } from './types'
const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql')

export default {
  pageManagerBlockByPageType: {
    type: PageManager,
    description: 'Returns the PageManager block of the home',
    args: {
      id: {
        type: GraphQLInt
      },
      language: {
        description: 'The language to return the PageManager blocks for',
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
      },
      currentPageType: {
        description: 'The current page type',
        type: GraphQLString
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.pageManagerBlockByPageTypeResolver(ctx, args)
  }
}
