const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql')
import { ACFPostFields } from './types'

export const Query = {
  getAcfPostFields: {
    type: ACFPostFields,
    args: {
      id: {
        type: new GraphQLList(GraphQLInt)
      },
      language: {
        type: GraphQLString
      }
    },
    resolve: function (_root, args, ctx) {
      return ctx.loader.getACFPosts(ctx, args.id, args)
    }
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
    resolve: (_root, args, ctx) => ctx.loader.getACFGlobals(ctx, args.section, args)
  }
}
