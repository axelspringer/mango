import { PageManager } from '../../../mango-plugin-pagemanager/src/types';
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { Language } from './languageType'
import { CategoryType } from './catType';
import { TagType } from '.';

export const PostByPermalinkResult = new GraphQLObjectType({
    name: 'PostByPermalink',
    description: 'Retrieves a post by a given permalink',
    fields: () => ({
        ID: {
            type: GraphQLInt
        },
        post_author: {
            type: GraphQLString
        },
        post_date: {
            type: GraphQLString
        },
        post_date_gmt: {
            type: GraphQLString
        },
        post_content: {
            type: GraphQLString
        },
        post_title: {
            type: GraphQLString
        },
        post_excerpt: {
            type: GraphQLString
        },
        post_status: {
            type: GraphQLString
        },
        post_name: {
            type: GraphQLString
        },
        post_modified: {
            type: GraphQLString
        },
        post_modified_gmt: {
            type: GraphQLString
        },
        post_content_filtered: {
            type: GraphQLString
        },
        post_parent: {
            type: GraphQLInt
        },
        guid: {
            type: GraphQLString
        },
        post_type: {
            type: GraphQLString
        },
        language: {
            type: Language
        },
        categories: {
            type: new GraphQLList(CategoryType)
        },
        tags: {
            type: new GraphQLList(TagType)
        },
        pagemanager: {
            type: PageManager
        }
    })
})
