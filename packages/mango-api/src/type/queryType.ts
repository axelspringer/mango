const { GraphQLString, GraphQLList } = require('graphql')

import { PostType } from './postType'
import { SettingsType } from './settingsType'
import { CategoryType } from './catType'
import { MediaType } from './mediaType'
import { TermType } from './termType'

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
  settings: {
    type: SettingsType,
    resolve: (_root, _args, ctx) => ctx.loader.getSettings(ctx)
  },
  terms: {
    type: TermType,
    resolve: (_root, _args, ctx) => ctx.loader.getTerms(ctx)
  },
  category: {
    type: CategoryType,
    args: {
      id: {
        type: GraphQLString
      }
    },
    resolve: (_root, _args, ctx) => ctx.loader.getCategory(ctx, _args.id, _args)
  },
  media: {
    type: MediaType,
    args: {
      id: {
        type: GraphQLString
      }
    },
    resolve: (_root, _args, ctx) => ctx.loader.getMedia(ctx, _args.id, _args)
  }
}


