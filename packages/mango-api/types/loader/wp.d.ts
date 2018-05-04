import { GraphQLContext } from 'graphql';
import { Loader } from './loader';
export declare enum API {
    Posts = "/wp/v2/posts",
    Categories = "/wp/v2/categories",
    Users = "/wp/v2/users",
    Settings = "/wp/v2/settings",
}
export declare class WP extends Loader {
    getPosts(ctx: GraphQLContext, args?: {}): Promise<any>;
    getCategories(ctx: GraphQLContext, ids?: number[], args?: {}): Promise<any[]>;
    getCategory(ctx: GraphQLContext, id: number, args?: {}): Promise<any>;
    getUser(ctx: GraphQLContext, id: number, args?: {}): Promise<any>;
    getSettings(ctx: GraphQLContext, args?: {}): Promise<any>;
}
