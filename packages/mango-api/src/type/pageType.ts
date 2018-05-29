
const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLString, GraphQLInt } = require('graphql')
import { GraphQLDateTime } from 'graphql-iso-date'
import { CategoryType } from './catType'
import { UserType } from './userType'
import MediaType from './mediaType'
import TagType from './tagType'
import { ImgType } from './imgType'
import EmbeddedType from './embeddedType'

export default new GraphQLObjectType({
  name: 'Page',
  description: 'Contains a Page from Wordpress',
  fields: () => ({
    date: {
      //type: GraphQLDateTime,
      type: GraphQLString,
      resolve: page => page.date
    },
    dateGmt: {
      type: GraphQLDateTime,
      resolve: page => page.date_gmt.rendered
    },
    featuredMedia: {
      type: MediaType,
      resolve: (page, args, ctx) => ctx.loader.getMedia(ctx, page.featured_media, args)
    },
    id: {
      type: GraphQLString,
      resolve: page => page.id
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
      resolve: (root, args, ctx) => ctx.loader.getImage(ctx, root.featured_media, args)
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
