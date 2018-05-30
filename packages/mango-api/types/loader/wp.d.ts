import { GraphQLContext } from 'graphql';
import { GetPost, GetCustomizer, ListPosts, ListCategories, ListTaxonomies, ListPages } from './args';
import Loader from './loader';
import { Type } from './response';
export default class WP extends Loader {
    getPosts(ctx: GraphQLContext, id: number, args?: ListPosts): Promise<any>;
    getCategory(ctx: GraphQLContext, id: number, args?: ListCategories, type?: Type): Promise<any>;
    getCategories(ctx: GraphQLContext, ids: [number], args?: ListCategories): Promise<any[]>;
    getImage(ctx: GraphQLContext, id: number, args?: {}): Promise<any>;
    getUser(ctx: GraphQLContext, id: number, args?: {}): Promise<any>;
    getPages(ctx: GraphQLContext, id: number, args?: ListPages): Promise<any>;
    getSettings(ctx: GraphQLContext, args?: {}): Promise<any>;
    getTaxonomies(ctx: GraphQLContext, id: number, args?: ListTaxonomies): Promise<any>;
    getTags(ctx: GraphQLContext, id: number, args?: {}): Promise<any>;
    getMedia(ctx: GraphQLContext, id: number, args?: {}): Promise<any>;
    getPost(ctx: GraphQLContext, args?: GetPost): Promise<any>;
    getCustomizer(ctx: GraphQLContext, args?: GetCustomizer): Promise<any>;
}
