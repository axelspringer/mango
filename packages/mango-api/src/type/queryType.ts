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
      status: {
        type: GraphQLString
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
      },
      _embed: {
        type: GraphQLBoolean
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getPostByPermalink(ctx, args.permalink, args)
  },

  categoryByPermalink: {
    type: CategoryByPermalinkResult,
    args: {
      permalink: {
        type: GraphQLString
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getCategoryByPermalink(ctx, args.permalink, args)
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
