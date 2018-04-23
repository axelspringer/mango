const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
import { PostType } from './postType'
import { SettingsType } from './settingsType'
import { PostByPermalinkResult } from './postByPermalinkType'

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
  post: {
    type: new GraphQLList(PostType),
    args: {
      id: {
        type: new GraphQLList(GraphQLInt)
      }
    },
    resolve: (_, args, ctx) => ctx.loader.getPost(ctx, args.id, args)
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
