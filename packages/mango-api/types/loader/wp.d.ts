import { GetPost, GetPostPermalink, GetPermalink, GetCustomizer, ListSlugs, ListPosts, ListCategories, ListTags, ListTaxonomies, ListPages } from './args';
import Loader from './loader';
import { Type } from './response';
export default class WPLoader extends Loader {
    getPosts(ctx: any, id: number, args?: ListPosts): Promise<any>;
    getCategory(ctx: any, id: number, args?: ListCategories, type?: Type): Promise<any>;
    getCategories(ctx: any, ids: [number], args?: ListCategories): Promise<any[]>;
    getPolylangPosts(ctx: any, translations: Object, args?: ListPosts): Promise<any[]>;
    getPolylangCategories(ctx: any, translations: Object, args?: ListPosts): Promise<any[]>;
    getPolylangPages(ctx: any, translations: Object, args?: ListPosts): Promise<any[]>;
    getPolylangTags(ctx: any, translations: Object, args?: ListPosts): Promise<any[]>;
    getImage(ctx: any, id: number, args?: {}): Promise<any>;
    getUser(ctx: any, id: number, args?: {}): Promise<any>;
    getPages(ctx: any, id: number, args?: ListPages): Promise<any>;
    getSettings(ctx: any, args?: {}): Promise<any>;
    getTaxonomies(ctx: any, id: number, args?: ListTaxonomies): Promise<any>;
    getTag(ctx: any, id: number, args?: ListTags, type?: Type): Promise<any>;
    getTags(ctx: any, ids: [number], args?: ListTags): Promise<any[]>;
    getMedia(ctx: any, id: number, args?: {}): Promise<any>;
    getPost(ctx: any, id: number, args?: GetPost): Promise<any>;
    getPostPermalink(ctx: any, args?: GetPostPermalink): Promise<any>;
    getPermalink(ctx: any, args?: GetPermalink): Promise<any>;
    getCustomizer(ctx: any, args?: GetCustomizer): Promise<any>;
    getMediaItem(ctx: any, id: number, args?: {}): Promise<any>;
    getSlugs(ctx: any, args?: ListSlugs): Promise<any>;
}
