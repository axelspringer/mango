import { API } from './loader'

export class Mock {
  constructor(adapter) {
    adapter.get(API.PageManagerCategories, require('../data/pageManagerCategories.json')).reply(200);
    adapter.get(API.PageManagerPages, require('../data/pageManagerPages.json')).reply(200);
    adapter.get(API.PageManagerPosts, require('../data/pageManagerPosts.json')).reply(200);
    adapter.get(API.PageManagerTags, require('../data/pageManagerTags.json')).reply(200);
  }
}
