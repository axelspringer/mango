import { GraphQLContext } from 'graphql'
import regeneratorRuntime from 'regenerator-runtime'
regeneratorRuntime.args

export enum API {
  ACFCategories = '/acf/v3/categories',
  ACFPosts = '/acf/v3/posts',
  ACFPages = '/acf/v3/pages',
  ACFTags = '/acf/v3/tags',
  ACFSettings = '/acf/v3/settings',
  ACFGlobal = '/acf/v3/global',
  WP = '/wp/v2',
  Categories = '/categories',
  CustomPosts = '/mango/v1/posts',
}
type Args = {
  type: string;
  id?: number;
}
export const Loader = {
  // fetch page manager categories
  getACFCategories: async function (ctx: GraphQLContext, id: number, args = {}) {
    const result = await this._fetcher(ctx, [API.ACFCategories, id].join('/'), args)
    // this is a hack for later
    return result.acf
  },
  // fetch page manager tags
  getCustomTerms: async function (ctx: GraphQLContext, args: Args) {
    const route = args.type !== undefined ? args.type : 'tags'
    const result = await this._fetcher(ctx, [API.WP, route].join('/') + '?per_page=100', args)
    return result
  },

  // fetch page manager tags
  getACFTags: async function (ctx: GraphQLContext, id: number, args = {}) {
    const result = await this._fetcher(ctx, [API.ACFTags, id].join('/'), args)
    // this is a hack for later
    return result.acf
  },

  // fetch page manager posts
  getACFPosts: async function (ctx: GraphQLContext, ids: number[], args = {}) {
    return Promise.all(ids.map(id => this._fetcher(ctx, [API.ACFPosts, id].join('/')), args))
  },

  // fetch page manager pages
  getACFPages: async function (ctx: GraphQLContext, id: number, args = {}) {
    const result = await this._fetcher(ctx, [API.ACFPages, id].join('/'), args)
    // this is a hack for later
    return result.acf
  },

  // fetch page manager data for global settings (e.g. for home)
  getACFGlobal: async function (ctx: GraphQLContext, section: string, args = {}) {
    return await this._fetcher(ctx, [API.ACFGlobal, section].join('/'), args)
  },

  // fetch custom post list by ids from wp-mediaimpact
  getCustomPostListById: async function (ctx: GraphQLContext, ids: number[], args = {}) {
    return Promise.all(ids.map(id => this._fetcher(ctx, [API.CustomPosts, id].join('/')), args))
  }
}