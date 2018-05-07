import { GraphQLContext } from 'graphql'
import regeneratorRuntime from 'regenerator-runtime'
regeneratorRuntime.args

export enum API {
  PageManagerCategories = '/page-manager/categories',
  PageManagerPosts = '/page-manager/posts',
  PageManagerPages = '/page-manager/pages',
  PageManagerTags = '/page-manager/tags',
  PageManagerSettings = '/page-manager/settings',
  PageManagerGlobal = '/page-manager/global',
  PageManagerLanguages = '/page-manager/languages'
}

export const Loader = {
  // fetch page manager categories
  getPageManagerCategories: async function (ctx: GraphQLContext, id: number, args = {}) {
    const result = await this._fetcher(ctx, [API.PageManagerCategories, id].join('/'), args)
    // this is a hack for later
    return result.data
  },

  // fetch page manager tags
  getPageManagerTags: async function (ctx: GraphQLContext, id: number, args = {}) {
    const result = await this._fetcher(ctx, [API.PageManagerTags, id].join('/'), args)
    // this is a hack for later
    return result.data
  },

  // fetch page manager posts
  getPageManagerPosts: async function (ctx: GraphQLContext, id: number, args = {}) {
    const result = await this._fetcher(ctx, [API.PageManagerPosts, id].join('/'), args)
    // this is a hack for later
    return result.data
  },

  // fetch page manager pages
  getPageManagerPages: async function (ctx: GraphQLContext, id: number, args = {}) {
    const result = await this._fetcher(ctx, [API.PageManagerPages, id].join('/'), args)
    // this is a hack for later
    return result.data
  },

  // fetch page manager data for global settings (e.g. for home)
  getPageManagerGlobal: async function (ctx: GraphQLContext, section: string, language: string, args = {}) {
    return await this._fetcher(ctx, [API.PageManagerGlobal, section, language].join('/'), args)
  },

  // fetch available languages
  getPageManagerLanguages: async function (ctx: GraphQLContext, args = {}) {
    return await this._fetcher(ctx, API.PageManagerLanguages, args)
  }
}
