// Type definitions for @axelspringer/mango-api
// Project: https://github.com/axelspringer/mango-api
// Definitions by: Axel Springer SE

import { GraphQLObjectType } from 'graphql'

export interface Result {
  data: {}
}

export class Loader {
  protected _fetcher(ctx, url: string, params: {}): Promise<Result>
}

export class WP extends Loader {
  public getPageManagerCategories(ctx, id: number, args: {}): {}
}

export class MockAdapter {
  constructor(axios, config)
}

export const PostType: GraphQLObjectType
