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
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.thumbnail
                }
                return 0
            }
        },
        medium: {
            type: ImgSizeType,
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.medium
                }
                return 0
            }
        },
        medium_large: {
            type: ImgSizeType,
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.medium_large
                }
                return 0
            }
        },
        full: {
            type: ImgSizeType,
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.full
                }
                return 0
            }
        }
    })
})
