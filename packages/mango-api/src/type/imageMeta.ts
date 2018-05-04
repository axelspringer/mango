const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')

export const ImageMetaType = new GraphQLObjectType({
  name: 'ImageMeta',
  fields: () => ({
    aperture: {
      type: GraphQLString
    },
    credit: {
      type: GraphQLString
    },
    camera: {
      type: GraphQLString
    },
    caption: {
      type: GraphQLString
    },
    createdTimestamp: {
      type: GraphQLString,
      resolve: meta => meta.created_timestamp
    },
    copyright: {
      type: GraphQLString
    },
    focalLength: {
      type: GraphQLString,
      resolve: meta => meta.focal_length
    },
    iso: {
      type: GraphQLString
    },
    shutterSpeed: {
      type: GraphQLString,
      resolve: meta => meta.shutter_speed
    },
    title: {
      type: GraphQLString
    },
    orientation: {
      type: GraphQLString
    },
    keywords: {
      type: new GraphQLList(GraphQLString)
    }
  })
})
