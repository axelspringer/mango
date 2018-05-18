const { GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean } = require('graphql')
import { PostType } from './postType'
import { SettingsType } from './settingsType'
import { CategoryType } from './catType'
import { MediaType } from './mediaType'
import { TermType } from './termType'
import { PostByPermalinkResult } from './postByPermalinkType'
import { CategoryByPermalinkResult } from './categoryByPermalinkType'
import { QueryIdType } from './idType'

export default {
  posts: {
    type: new GraphQLList(PostType),
    args: {
      lang: {
        type: GraphQLString
      },
      context: {
        type: GraphQLString
      },
      page: {
        type: GraphQLInt
      },
      per_page: {
        type: GraphQLInt
      },
      search: {
        type: GraphQLString
      },
      exclude: {
        type: new GraphQLList(GraphQLInt)
      },
      include: {
        type: new GraphQLList(GraphQLInt)
      },
      offset: {
        type: GraphQLInt
      },
      order: {
        type: GraphQLString
      },
      orderby: {
        type: GraphQLString
      },
      status: {
        type: GraphQLString
      },
      categories: {
        type: new GraphQLList(GraphQLString)
      },
      categories_exclude: {
        type: new GraphQLList(GraphQLString)
      }
    },
    resolve: (_, args, ctx) => ctx.loader.getPosts(ctx, args)
  },

  post: {
    type: PostType,
    args: {
      id: {
        type: GraphQLInt
      },
      permalink: {
        type: GraphQLString
      },
      _embed: {
        type: GraphQLBoolean
      }
    },
    resolve: (_, args, ctx) => ctx.loader.getPost(ctx, args)
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
      },
      context: {
        type: GraphQLString
      },
      page: {
        type: GraphQLInt
      },
      per_page: {
        type: GraphQLInt
      },
      search: {
        type: GraphQLString
      },
      exclude: {
        type: new GraphQLList(GraphQLInt)
      },
      include: {
        type: new GraphQLList(GraphQLInt)
      },
      order: {
        type: GraphQLString
      },
      orderby: {
        type: GraphQLString
      },
      hide_empty: {
        type: GraphQLBoolean
      },
      parent: {
        type: GraphQLInt
      },
      post: {
        type: GraphQLInt
      },
      slug: {
        type: new GraphQLList(GraphQLString)
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getCategory(ctx, args.id, args)
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
