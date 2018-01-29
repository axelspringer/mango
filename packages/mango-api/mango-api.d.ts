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

export enum API {
  Posts = '/wp/v2/posts',
  Categories = '/wp/v2/categories',
  Users = '/wp/v2/users',
  Settings = '/wp/v2/settings',
  NavMenu = '/mango/v1/nav/menus',
  NavItems = '/mango/v1/nav/items',
  NavLocations = '/mango/v1/nav/locations'
}

export const PostType: GraphQLObjectType
