import { API } from '../loader'

export class Mock {

  constructor(adapter) {
    adapter.get(API.Posts, require('../../data/posts.json')).reply(200)
    adapter.get(API.Users, require('../../data/users.json')).reply(200)
    adapter.get(API.NavLocations, require('../../data/navLocations.json'), true).reply(200)
    adapter.get(API.NavLocations + '/', require('../../data/navLocations.json')).reply(200)
    adapter.get(API.NavMenu, require('../../data/navMenus.json')).reply(200)
    adapter.get(API.NavItems, require('../../data/navItems.json')).reply(200)
    adapter.get(API.Settings, require('../../data/settings.json')).reply(200)
  }

}
