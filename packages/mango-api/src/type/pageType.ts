
const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLTypeReference, GraphQLString, GraphQLInt } = require('graphql')
import { GraphQLDateTime } from 'graphql-iso-date'
import { UserType } from './userType'
import MediaType from './mediaType'
import { ImgType } from './imgType'
import EmbeddedType from './embeddedType'
import PolylangTranslationType from './polylangTranslationType'
import Status from '../models/status'

const pageType = new GraphQLObjectType({
  name: 'Page',
  description: 'Contains a Page from Wordpress',
  fields: () => ({
    date: {
      type: GraphQLDateTime,
      resolve: page => page.date ? new Date(page.date) : null
    },
    dateGmt: {
      type: GraphQLDateTime,
      resolve: page => page.date_gmt && page.date_gmt.rendered ? new Date(page.date_gmt.rendered) : null
    },
    featuredMedia: {
      type: MediaType,
      resolve: (page, args, ctx) => !page.featured_media ? null : page.status !== Status.Publish ? ctx.loader.getMediaItem(ctx, page.featured_media, args) : ctx.loader.getMedia(ctx, page.featured_media, args)
    },
    id: {
      type: GraphQLString,
      resolve: page => page.id
    },
    modified: {
      type: GraphQLDateTime,
      resolve: page => page.modified ? new Date(page.modified) : null
    },
    modifiedGmt: {
      type: GraphQLDateTime,
      resolve: page => page.modified_gmt ? new Date(page.modified_gmt) : null
    },
    status: {
      type: GraphQLString,
      resolve: page => page.status
    },
    type: {
      type: GraphQLString,
      resolve: page => page.type
    },
    password: {
      type: GraphQLString,
      resolve: page => page.password
    },
    excerpt: {
      type: GraphQLString,
      resolve: page => page.excerpt.rendered
    },
    commentStatus: {
      type: GraphQLString,
      resolve: page => page.comment_status
    },
    pingStatus: {
      type: GraphQLString,
      resolve: page => page.ping_status
    },
    title: {
      type: GraphQLString,
      resolve: page => page.title.rendered
    },
    link: {
      type: GraphQLString,
      resolve: page => page.link
    },
    sticky: {
      type: GraphQLBoolean,
      resolve: page => page.sticky
    },
    lang: {
      type: GraphQLString,
      resolve: page => page.lang
    },
    translations: {
      type: PolylangTranslationType,
      resolve: (page, args, ctx) => ctx.loader.getPolylangPages(ctx, page.translations, { ...args, preview: page.status !== Status.Publish })
    },
    meta: {
      type: new GraphQLList(GraphQLString),
      resolve: page => page.meta
    },
    template: {
      type: GraphQLString,
      resolve: page => page.template
    },
    content: {
      type: GraphQLString,
      resolve: page => page.content.rendered
    },
    slug: {
      type: GraphQLString,
      resolve: page => page.slug
    },
    author: {
      type: UserType,
      resolve: (root, args, ctx) => ctx.loader.getUser(ctx, root.author, args)
    },
    authorExclude: {
      type: GraphQLInt,
      resolve: page => page.author_exclude
    },
    format: {
      type: GraphQLString,
      resolve: page => page.format
    },
    pagemanager: {
      type: EmbeddedType,
      resolve: page => page.pagemanager
    },
    img: {
      type: ImgType,
      resolve: (page, args, ctx) => ctx.loader.getImage(ctx, page.featured_media, args)
    },
    parent: {
      type: pageType,
      resolve: (page, args, ctx) => ctx.loader.getPost(ctx, page.parent, args)
    },
    acf: {
      type: EmbeddedType,
      resolve: cat => cat.acf
    },
    embedded: {
      type: EmbeddedType,
      resolve: cat => cat._embedded
    }
  }),
})

export default pageType
