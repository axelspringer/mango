const { GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean } = require('graphql')
import PostType from './postType'
import PageType from './pageType'
import ItemType from './itemType'
import { SettingsType } from './settingsType'
import CategoryType from './catType'
import MediaType from './mediaType'
import TagType from './tagType'
import TaxonomiesTypes from './taxonomiesTypes'
import EmbeddedType from './embeddedType'
import SlugType from './slugType'

export default {
  posts: {
    type: new GraphQLList(PostType),
    args: {
      id: {
        type: GraphQLInt
      },
      lang: {
        type: GraphQLString
      },
      slug: {
        type: new GraphQLList(GraphQLString)
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
      },
      tags: {
        type: new GraphQLList(GraphQLString)
      },
      tags_exclude: {
        type: new GraphQLList(GraphQLString)
      },
      _embed: {
        type: GraphQLBoolean
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getPosts(ctx, args.id, args)
  },

  pages: {
    type: new GraphQLList(PageType),
    args: {
      id: {
        type: GraphQLInt
      },
      lang: {
        type: GraphQLString
      },
      slug: {
        type: new GraphQLList(GraphQLString)
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
      menu_order: {
        type: GraphQLInt
      },
      parent: {
        type: GraphQLInt
      },
      parent_exclude: {
        type: new GraphQLList(GraphQLInt)
      },
      categories: {
        type: new GraphQLList(GraphQLString)
      },
      categories_exclude: {
        type: new GraphQLList(GraphQLString)
      },
      _embed: {
        type: GraphQLBoolean
      }
    },
    resolve: (_, args, ctx) => ctx.loader.getPages(ctx, args.id, args)
  },

  slugs: {
    type: new GraphQLList(SlugType),
    args: {
      slug: {
        type: new GraphQLList(GraphQLString)
      },
      preview: {
        type: GraphQLBoolean
      },
      _embed: {
        type: GraphQLBoolean
      }
    },
    resolve: (_, args, ctx) => ctx.loader.getSlugs(ctx, args)
  },

  settings: {
    type: SettingsType,
    resolve: (_root, _args, ctx) => ctx.loader.getSettings(ctx)
  },

  taxonomies: {
    type: TaxonomiesTypes,
    args: {
      lang: {
        type: GraphQLString
      },
      slug: {
        type: new GraphQLList(GraphQLString)
      },
      context: {
        type: GraphQLString
      },
      type: {
        type: GraphQLString
      }
    },
    resolve: (_root, _args, ctx) => ctx.loader.getTaxonomies(ctx)
  },

  tags: {
    type: new GraphQLList(TagType),
    args: {
      id: {
        type: GraphQLInt
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
      hide_empty: {
        type: GraphQLBoolean
      },
      post: {
        type: GraphQLInt
      },
      slug: {
        type: new GraphQLList(GraphQLString)
      },
      lang: {
        type: GraphQLString
      },
      _embed: {
        type: GraphQLBoolean
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getTag(ctx, args.id, args)
  },

  tag: {
    type: TagType,
    args: {
      id: {
        type: GraphQLInt
      },
      lang: {
        type: GraphQLString
      },
      slug: {
        type: new GraphQLList(GraphQLString)
      },
      _embed: {
        type: GraphQLBoolean
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getTag(ctx, args.id, args, 'Object')
  },

  categories: {
    type: new GraphQLList(CategoryType),
    args: {
      id: {
        type: GraphQLInt
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
      },
      lang: {
        type: GraphQLString
      },
      _embed: {
        type: GraphQLBoolean
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getCategory(ctx, args.id, args)
  },

  category: {
    type: CategoryType,
    args: {
      id: {
        type: GraphQLInt
      },
      slug: {
        type: new GraphQLList(GraphQLString)
      },
      lang: {
        type: GraphQLString
      },
      _embed: {
        type: GraphQLBoolean
      },
      parent: {
        type: GraphQLInt
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getCategory(ctx, args.id, args, 'Object')
  },

  post: {
    type: ItemType,
    args: {
      id: {
        type: GraphQLInt // the id takes presence
      },
      permalink: {
        type: GraphQLString
      },
      preview: { // this needs to be authenticated later
        type: GraphQLBoolean
      },
      _embed: {
        type: GraphQLBoolean
      }
    }, // decide upon id, or permalink
    resolve: (_root, args, ctx) => args.id ? ctx.loader.getPost(ctx, args.id, args) : ctx.loader.getPostPermalink(ctx, args)
  },

  page: {
    type: PageType,
    args: {
      id: {
        type: GraphQLInt // the id takes presence
      },
      permalink: {
        type: GraphQLString
      },
      preview: { // this needs to be authenticated later
        type: GraphQLBoolean
      },
      _embed: {
        type: GraphQLBoolean
      }
    },
    resolve: (_root, args, ctx) => args.id ? ctx.loader.getPost(ctx, args.id, args) : ctx.loader.getPostPermalink(ctx, args)
  },

  media: {
    type: MediaType,
    args: {
      id: {
        type: GraphQLString
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getMedia(ctx, args.id, args)
  },

  customizer: {
    type: EmbeddedType,
    args: {
      language: {
        type: GraphQLString
      }
    },
    resolve: (_root, args, ctx) => ctx.loader.getCustomizer(ctx, args)
  },

  permalink: {
    type: ItemType,
    args: {
      permalink: {
        type: GraphQLString
      },
      lang: {
        type: GraphQLString
      },
      _embed: {
        type: GraphQLBoolean
      }
    }, // decide upon id, or permalink
    resolve: (_root, args, ctx) => ctx.loader.getPermalink(ctx, args)
  },
}
