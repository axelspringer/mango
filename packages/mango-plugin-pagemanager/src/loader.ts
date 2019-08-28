import { GraphQLContext } from 'graphql'
import API from './api'

export default {
  async pageManagerBlockByPageTypeResolver(ctx: GraphQLContext, args = { id: 0, language: '', section: '', currentPageType: '' }) {
    if (0 === Object.keys(args).length && Object === args.constructor) {
      return null
    }

    if ('category' === args.currentPageType && args.id) {
      return await this._fetcher(ctx, [API.PageManagerCategories, args.id].join('/'), args)
    }

    if ('post_tag' === args.currentPageType && args.id) {
      return await this._fetcher(ctx, [API.PageManagerTags, args.id].join('/'), args)
    }

    if ('post' === args.currentPageType && args.id) {
      return await this._fetcher(ctx, [API.PageManagerPosts, args.id].join('/'), args)
    }

    if ('page' === args.currentPageType && args.id) {
      return await this._fetcher(ctx, [API.PageManagerPages, args.id].join('/'), args)
    }

    if ('home' === args.currentPageType && args.language) {
      return await this._fetcher(ctx, [API.PageManagerGlobal, 'home', args.language].join('/'), args)
    }

    if ('global' === args.currentPageType && args.section && args.language) {
      return await this._fetcher(ctx, [API.PageManagerGlobal, args.section, args.language].join('/'), args)
    }

    if ('language' === args.currentPageType) {
      return await this._fetcher(ctx, API.PageManagerLanguages, args)
    }

    return null
  },

  async getPageManagerLanguages(ctx: GraphQLContext, args = {}) {
    return await this._fetcher(ctx, API.PageManagerLanguages, args)
  }
}
