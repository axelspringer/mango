import { API } from './loader'

export class Mock {
  constructor(adapter) {
    adapter.get(API.Customizer, require('../data/settings.json'), true).reply(200)
  }
}
