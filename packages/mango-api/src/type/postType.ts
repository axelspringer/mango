
const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLString, GraphQLInt } = require('graphql')
import { GraphQLDateTime } from 'graphql-iso-date'
import { CategoryType } from './catType'
import { UserType } from './userType'
import TagType from './tagType'
import MediaType from './mediaType'
import { ImgType } from './imgType'
import EmbeddedType from './embeddedType'
import PolylangTranslationType from './polylangTranslationType'

export default new GraphQLObjectType({
  name: 'Post',
  description: 'Contains a Post from WordPress',
  fields: () => ({
    date: {
      //type: GraphQLDateTime,
      type: GraphQLString,
      resolve: post => post.date
    },
    dateGmt: {
      type: GraphQLDateTime,
      resolve: post => post.date_gmt.rendered
    },
    id: {
      type: GraphQLString,
      resolve: post => post.id
    },
    link: {
      type: GraphQLString,
      resolve: post => post.link
    },
    modified: {
      type: GraphQLDateTime,
      resolve: post => post.modified
    },
    lang: {
      type: GraphQLString,
      resolve: post => post.lang
    },
    translations: {
      type: PolylangTranslationType,
      resolve: (post, args, ctx) => ctx.loader.getPolylangPosts(ctx, post.translations, args)
    },
    modifiedGmt: {
      type: GraphQLDateTime,
      resolve: post => post.modified_gmt
    },
    status: {
      type: GraphQLString,
      resolve: post => post.status
    },
    type: {
      type: GraphQLString,
      resolve: post => post.type
    },
    password: {
      type: GraphQLString,
      resolve: post => post.password
    },
    excerpt: {
      type: GraphQLString,
      resolve: post => post.excerpt ? post.excerpt.rendered : null
    },
    featuredMedia: {
      type: MediaType,
      resolve: (post, args, ctx) => ctx.loader.getMedia(ctx, post.featured_media, args)
    },
    commentStatus: {
      type: GraphQLString,
      resolve: post => post.comment_status
    },
    pingStatus: {
      type: GraphQLString,
      resolve: post => post.ping_status
    },
    title: {
      type: GraphQLString,
      resolve: post => post.title.rendered
    },
    sticky: {
      type: GraphQLBoolean,
      resolve: post => post.sticky
    },
    meta: {
      type: new GraphQLList(GraphQLString),
      resolve: post => post.meta
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: (root, args, ctx) => ctx.loader.getCategories(ctx, root.categories, args)
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve: (root, args, ctx) => ctx.loader.getTags(ctx, root.tags, args)
    },
    template: {
      type: GraphQLString,
      resolve: post => post.template
    },
    content: {
      type: GraphQLString,
      resolve: post => post.content ? post.content.rendered : null
    },
    slug: {
      type: GraphQLString,
      resolve: post => post.slug
    },
    author: {
      type: UserType,
      resolve: (root, args, ctx) => ctx.loader.getUser(ctx, root.author, args)
    },
    format: {
      type: GraphQLString,
      resolve: post => post.format
    },
    pagemanager: {
      type: EmbeddedType,
      resolve: post => post.pagemanager
    },
    img: {
      type: ImgType,
      resolve: (root, args, ctx) => ctx.loader.getImage(ctx, root.featured_media, args)
    },
    acf: {
      type: EmbeddedType,
      resolve: cat => cat.acf
    },
    embedded: {
      type: EmbeddedType,
      resolve: post => post._embedded
    }
  }),
})
