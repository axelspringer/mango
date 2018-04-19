const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
import { PostType } from './postType'
import { SettingsType } from './settingsType'

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
  settings: {
    type: SettingsType,
    resolve: (_root, _args, ctx) => ctx.loader.getSettings(ctx)
  }
}
