import { WP } from '../loader/api'

export function addDefaultMocks(adapter) {
  adapter.get(WP.Posts, require('../../data/posts.json')).reply(200)
  adapter.get(WP.Users, require('../../data/users.json')).reply(200)
  adapter.get(WP.Settings, require('../../data/settings.json')).reply(200)
}

export function addPluginMocks(adapter, config) {
  config.plugin.forEach(plugin => new plugin.mock(adapter))
}
