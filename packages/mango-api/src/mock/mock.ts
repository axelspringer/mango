import { API } from '../loader'

export class Mock {

  constructor(adapter) {
    adapter.get(API.Posts, require('../../data/posts.json')).reply(200)
    adapter.get(API.Users, require('../../data/users.json')).reply(200)
    adapter.get(API.Settings, require('../../data/settings.json')).reply(200)
  }

}
