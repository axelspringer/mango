const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')

import { ImageMetaType } from './imageMeta'

export const ImageSize = new GraphQLObjectType({
  name: 'ImageSize',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    width: {
      type: GraphQLInt
    },
    height: {
      type: GraphQLInt
    },
    file: {
      type: GraphQLString
    },
    mimeType: {
      type: GraphQLString,
      resolve: media => media.mime_type
    },
    sourceUrl: {
      type: GraphQLString,
      resolve: media => media.source_url
    }
  })
})
