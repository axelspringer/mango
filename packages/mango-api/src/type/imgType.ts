const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')

const ImgSizeType = new GraphQLObjectType({
    name: 'ImageSizes',
    fields: () => ({
        file: {
            type: GraphQLString,
            resolve: (item) => item.file
        },
        width: {
            type: GraphQLInt,
            resolve: (item) => item.width
        },
        height: {
            type: GraphQLInt,
            resolve: (item) => item.height
        },
        source: {
            type: GraphQLString,
            resolve: (item) => item.source_url
        }
    })
})

export const ImgType = new GraphQLObjectType({
    name: 'Image',
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: img => img.id
        },
        alt: {
            type: GraphQLString,
            resolve: img => img.alt
        },
        thumbnail: {
            type: ImgSizeType,
            resolve: img => img.media_details.sizes.thumbnail
        },
        medium: {
            type: ImgSizeType,
            resolve: img => img.media_details.sizes.medium
        },
        medium_large: {
            type: ImgSizeType,
            resolve: img => img.media_details.sizes.medium_large
        },
        full: {
            type: ImgSizeType,
            resolve: img => img.media_details.sizes.full
        }
    })
})
