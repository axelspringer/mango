import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const Language = new GraphQLObjectType({
    name: 'Language',
    description: 'Language object (Wordpress Polylang plugin)',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        order: {
            type: GraphQLInt
        },
        slug: {
            type: GraphQLString
        },
        locale: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }
    })
})
