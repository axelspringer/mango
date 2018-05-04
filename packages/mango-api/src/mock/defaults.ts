import API from '../loader/api'

export function addDefaultMocks(adapter) {
  adapter.get(API.Posts, require('../../data/posts.json')).reply(200)
  adapter.get(API.Users, require('../../data/users.json')).reply(200)
  adapter.get(API.Settings, require('../../data/settings.json')).reply(200)
}

export function addPluginMocks(adapter, config) {
  config.plugin.forEach(plugin => new plugin.mock(adapter))
}
