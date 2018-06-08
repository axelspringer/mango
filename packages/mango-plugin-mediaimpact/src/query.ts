const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql')
import { ACFPostFields, CustomTermType, PostType } from './types'
import { GraphQLInt } from 'graphql';


export const Query = {
  acfPostFields: {
    type: ACFPostFields,
    args: {
      id: {
        type: new GraphQLList(GraphQLInt)
      },
      language: {
        type: GraphQLString
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getACFPosts(ctx, args.id, args)
  },
  acfGlobal: {
    type: ACFPostFields,
    args: {
      language: {
        type: GraphQLString
      },
      section: {
        type: GraphQLString
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getACFGlobal(ctx, args.section, args)
  },
  customTerms: {
    type: new GraphQLList(CustomTermType),
    args: {
      type: {
        type: GraphQLString
      },
      id: {
        type: GraphQLInt
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getCustomTerms(ctx, args)
  },
  customPostListById: {
    type: new GraphQLList(PostType),
    args: {
      id: {
        type: new GraphQLList(GraphQLInt)
      }
    },
    resolve: (_, args, ctx) => ctx.loader.getCustomPostListById(ctx, args.id, args)
  }
}
