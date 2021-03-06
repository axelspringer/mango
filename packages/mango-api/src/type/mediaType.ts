const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')

import { MediaDetailType } from './mediaDetailType'
import { GraphQLDateTime } from 'graphql-iso-date'
import EmbeddedType from './embeddedType'

export default new GraphQLObjectType({
  name: 'WPMedia',
  description: 'Wordpress media object https://developer.wordpress.org/rest-api/reference/media/',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    date: {
      type: GraphQLDateTime,
      resolve: media => media.date
    },
    dateGmt: {
      type: GraphQLDateTime,
      resolve: media => media.date_gmt.rendered
    },
    title: {
      type: GraphQLString,
      resolve: media => media.title.rendered
    },
    description: {
      type: GraphQLString,
      resolve: media => media.description.rendered
    },
    caption: {
      type: GraphQLString,
      resolve: media => media.caption.rendered
    },
    altText: {
      type: GraphQLString,
      resolve: media => media.alt_text
    },
    mimeType: {
      type: GraphQLString,
      resolve: media => media.mime_type
    },
    mediaDetails: {
      type: MediaDetailType,
      resolve: media => media.media_details
    },
    link: {
      type: GraphQLString,
      resolve: media => media.link
    },
    slug: {
      type: GraphQLString
    },
    meta: {
      type: new GraphQLList(GraphQLString)
    },
    acf: {
      type: EmbeddedType,
      resolve: media => media.acf
    }
  })
})
