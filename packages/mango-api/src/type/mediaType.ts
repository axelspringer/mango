const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')

import { MediaDetailType } from './mediaDetailType'
import { GraphQLDateTime } from 'graphql-iso-date'

export const MediaType = new GraphQLObjectType({
  name: 'Media',
  description: 'Wordpress Media object',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    date: {
      type: GraphQLDateTime,
      resolve: post => post.date
    },
    dateGmt: {
      type: GraphQLDateTime,
      resolve: post => post.date_gmt.rendered
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
    }
  })
})
