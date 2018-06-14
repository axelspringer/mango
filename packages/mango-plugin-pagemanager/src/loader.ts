import { GraphQLContext } from 'graphql'
import API from './api'

export default {
  // fetch page manager categories
  getPageManagerCategories: async function (ctx: GraphQLContext, id: number, args = {}) {
    return await this._fetcher(ctx, [API.PageManagerCategories, id].join('/'), args)
  },

  // fetch page manager tags
  getPageManagerTags: async function (ctx: GraphQLContext, id: number, args = {}) {
    return await this._fetcher(ctx, [API.PageManagerTags, id].join('/'), args)
  },

  // fetch page manager posts
  getPageManagerPosts: async function (ctx: GraphQLContext, id: number, args = {}) {
    return await this._fetcher(ctx, [API.PageManagerPosts, id].join('/'), args)
  },

  // fetch page manager pages
  getPageManagerPages: async function (ctx: GraphQLContext, id: number, args = {}) {
    return await this._fetcher(ctx, [API.PageManagerPages, id].join('/'), args)
  },

  // fetch page manager home
  getPageManagerHome: async function (ctx: GraphQLContext, language: string, args = {}) {
    return await this._fetcher(ctx, [API.PageManagerGlobal, 'home', language].join('/'), args)
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
