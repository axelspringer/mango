import { GetPost, GetPostPermalink, GetPermalink, GetSearch, GetCustomizer, ListSlugs, ListPosts, ListCategories, ListTags, ListTaxonomies, ListPages } from './args';
import Loader from './loader';
import { Type } from './response';
export default class WPLoader extends Loader {
    getPosts(ctx: any, id: number, args?: ListPosts): Promise<{}>;
    getCategory(ctx: any, id: number, args?: ListCategories, type?: Type): Promise<any>;
    getCategories(ctx: any, ids: [number], args?: ListCategories): Promise<any[]>;
    getPolylangPosts(ctx: any, post: any, args?: ListPosts): Promise<any[]>;
    getPolylangCategories(ctx: any, cat: any, args?: ListPosts): Promise<any[]>;
    getPolylangPages(ctx: any, page: any, args?: ListPosts): Promise<any[]>;
    getPolylangTags(ctx: any, tag: any, args?: ListPosts): Promise<any[]>;
    getImage(ctx: any, id: number, args?: {}): Promise<{}>;
    getUser(ctx: any, id: number, args?: {}): Promise<{}>;
    getPages(ctx: any, id: number, args?: ListPages): Promise<{}>;
    getSettings(ctx: any, args?: {}): Promise<{}>;
    getTaxonomies(ctx: any, id: number, args?: ListTaxonomies): Promise<{}>;
    getTag(ctx: any, id: number, args?: ListTags, type?: Type): Promise<any>;
    getTags(ctx: any, ids: [number], args?: ListTags): Promise<any[]>;
    getMedia(ctx: any, id: number, args?: {}): Promise<{}>;
    getPost(ctx: any, id: number, args?: GetPost): Promise<{}>;
    getPostPermalink(ctx: any, args?: GetPostPermalink): Promise<{}>;
    getPermalink(ctx: any, args?: GetPermalink): Promise<{}>;
    getCustomizer(ctx: any, args?: GetCustomizer): Promise<{}>;
    getMediaItem(ctx: any, id: number, args?: {}): Promise<{}>;
    getSlugs(ctx: any, args?: ListSlugs): Promise<{}>;
    getSearch(ctx: any, search: any, page?: number, args?: GetSearch): Promise<any[]>;
}
