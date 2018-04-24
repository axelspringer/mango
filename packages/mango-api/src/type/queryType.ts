const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
import { PostType } from './postType'
import { SettingsType } from './settingsType'
import { PostByPermalinkResult } from './postByPermalinkType'

export const defaultQuery = {
  postList: {
    type: new GraphQLList(PostType),
    args: {
      lang: {
        type: GraphQLString
      }
    },
    resolve: (_, args, ctx) => ctx.loader.getPosts(ctx, args)
  },
  postListById: {
    type: new GraphQLList(PostType),
    args: {
      id: {
        type: new GraphQLList(GraphQLInt)
      }
    },
    resolve: (_, args, ctx) => ctx.loader.getPostListById(ctx, args.id, args)
  },
  postListByCategoryId: {
    type: new GraphQLList(PostType),
    args: {
      id: {
        type: GraphQLInt
      }
    },
    resolve: (_, args, ctx) => ctx.loader.getPostListByCategoryId(ctx, args.id, args)
  },
  postByPermalink: {
    type: PostByPermalinkResult,
    args: {
      permalink: {
        type: GraphQLString
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getPostByPermalink(ctx, args)
  },
  settings: {
    type: SettingsType,
    resolve: (_root, _args, ctx) => ctx.loader.getSettings(ctx)
  }
}
