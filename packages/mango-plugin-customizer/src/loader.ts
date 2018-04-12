import { GraphQLContext } from 'graphql'

export enum API {
  Customizer = '/mango/v1/customizer'
}

export const Loader = {
  // fetch customizer settings
  getCustomizer: async function (ctx: GraphQLContext, args = {}) {
    return this._fetcher(ctx, [API.Customizer].join('/'), args)
  }
}
