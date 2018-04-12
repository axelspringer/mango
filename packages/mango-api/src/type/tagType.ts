const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')

export const TagType = new GraphQLObjectType({
    name: 'Tag',
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: tag => tag.id
        },
        count: {
            type: GraphQLInt,
            resolve: tag => tag.count
        },
        description: {
            type: GraphQLString,
            resolve: tag => tag.description
        },
        link: {
            type: GraphQLString,
            resolve: tag => tag.link
        },
        name: {
            type: GraphQLString,
            resolve: tag => tag.name
        },
        slug: {
            type: GraphQLString,
            resolve: tag => tag.slug
        },
        taxonomy: {
            type: GraphQLString,
            resolve: tag => tag.taxonomy
        }
    })
})
