import { GraphQLContext } from 'graphql';
import { GetPost, GetPostPermalink, GetCustomizer, ListPosts, ListCategories, ListTaxonomies, ListPages } from './args';
import Loader from './loader';
import { Type } from './response';
export default class WP extends Loader {
    getPosts(ctx: GraphQLContext, id: number, args?: ListPosts): Promise<any>;
    getCategory(ctx: GraphQLContext, id: number, args?: ListCategories, type?: Type): Promise<any>;
    getCategories(ctx: GraphQLContext, ids: [number], args?: ListCategories): Promise<any[]>;
    getPolylangPosts(ctx: GraphQLContext, translations: Object, args?: ListPosts): Promise<any[]>;
    getPolylangCategories(ctx: GraphQLContext, translations: Object, args?: ListPosts): Promise<any[]>;
    getPolylangPages(ctx: GraphQLContext, translations: Object, args?: ListPosts): Promise<any[]>;
    getImage(ctx: GraphQLContext, id: number, args?: {}): Promise<any>;
    getUser(ctx: GraphQLContext, id: number, args?: {}): Promise<any>;
    getPages(ctx: GraphQLContext, id: number, args?: ListPages): Promise<any>;
    getSettings(ctx: GraphQLContext, args?: {}): Promise<any>;
    getTaxonomies(ctx: GraphQLContext, id: number, args?: ListTaxonomies): Promise<any>;
    getTags(ctx: GraphQLContext, id: number, args?: {}): Promise<any>;
    getMedia(ctx: GraphQLContext, id: number, args?: {}): Promise<any>;
    getPost(ctx: GraphQLContext, id: number, args?: GetPost): Promise<any>;
    getPostPermalink(ctx: GraphQLContext, args?: GetPostPermalink): Promise<any>;
    getCustomizer(ctx: GraphQLContext, args?: GetCustomizer): Promise<any>;
}
