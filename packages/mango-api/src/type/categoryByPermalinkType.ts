// import { PageManager } from '../../../mango-plugin-pagemanager/src/types';
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { CategoryType, TagType, Language } from '.';

export const CategoryByPermalinkResult = new GraphQLObjectType({
    name: 'CategoryByPermalink',
    description: 'Retrieves a category by a given permalink',
    fields: () => ({
        term_id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        slug: {
            type: GraphQLString
        },
        term_group: {
            type: GraphQLString
        },
        term_taxonomy_id: {
            type: GraphQLString
        },
        taxonomy: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        parent: {
            type: GraphQLInt
        },
        count: {
            type: GraphQLInt
        },
        filter: {
            type: GraphQLString
        },
        cat_ID: {
            type: GraphQLInt
        },
        category_count: {
            type: GraphQLInt
        },
        category_description: {
            type: GraphQLString
        },
        cat_name: {
            type: GraphQLString
        },
        category_nicename: {
            type: GraphQLString
        },
        category_parent: {
            type: GraphQLInt
        }
    })
})
