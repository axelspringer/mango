import { MockAdapter } from './adapter'
import { WP } from '../loader'

export class MockDefaults {

  public adapter: MockAdapter

  constructor(public axios, public config) {
    this.adapter = new MockAdapter(axios, config)

    this.adapter.get(WP.Posts, require('../../data/posts.json')).reply(200)
    this.adapter.get(WP.Users, require('../../data/users.json')).reply(200)
    this.adapter.get(WP.NavLocations, require('../../data/navLocations.json'), true).reply(200)
    this.adapter.get(WP.NavLocations + '/', require('../../data/navLocations.json')).reply(200)
    this.adapter.get(WP.NavMenu, require('../../data/navMenus.json')).reply(200)
    this.adapter.get(WP.NavItems, require('../../data/navItems.json')).reply(200)
    this.adapter.get(WP.Settings, require('../../data/settings.json')).reply(200)
    this.adapter.get(WP.PageManagerCategories, require('../../data/pageManagerCategories.json')).reply(200)
    this.adapter.get(WP.PageManagerTags, require('../../data/pageManagerTags.json')).reply(200)
    this.adapter.get(WP.PageManagerPosts, require('../../data/pageManagerPosts.json')).reply(200)
    this.adapter.get(WP.PageManagerPages, require('../../data/pageManagerPages.json')).reply(200)
  }

}
