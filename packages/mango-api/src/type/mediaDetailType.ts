const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')

import { ImageSize } from './imageSize'
import { ImageMetaType } from './imageMeta'

export const MediaDetailType = new GraphQLObjectType({
  name: 'MediaDetailType',
  fields: () => ({
    width: {
      type: GraphQLInt
    },
    height: {
      type: GraphQLInt
    },
    file: {
      type: GraphQLString
    },
    sizes: {
      type: GraphQLList(ImageSize),
      resolve: media => {
        let sizes = []

        for (let propertyName in media.sizes) {
          if (media.sizes.hasOwnProperty(propertyName)) {
            let size = media.sizes[propertyName]

            size.name = propertyName

            sizes.push(size)
          }
        }

        return sizes
      }
    },
    imageMeta: {
      type: ImageMetaType,
      resolve: media => media.image_meta
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
      type: GraphQLString,
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
