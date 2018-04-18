const { GraphQLString, GraphQLInt } = require('graphql')
import { ACF } from './types'

export const Query = {
  acfPost: {
    type: ACF,
    args: {
      id: {
        type: GraphQLInt
      },
      language: {
        type: GraphQLString
      }
    },
    resolve: function (_root, args, ctx) {
      const rs = ctx.loader.getACFPosts(ctx, args.id, args)
      console.log(rs)
      return rs
    }
  },
  acfGlobal: {
    type: ACF,
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
