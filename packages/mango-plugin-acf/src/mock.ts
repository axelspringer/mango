import { API } from './loader'

export class Mock {
  constructor(adapter) {
    adapter.get(API.ACFCategories, require('../data/pageManagerCategories.json')).reply(200);
    adapter.get(API.ACFPages, require('../data/pageManagerPages.json')).reply(200);
    adapter.get(API.ACFPosts, require('../data/pageManagerPosts.json')).reply(200);
    adapter.get(API.ACFTags, require('../data/pageManagerTags.json')).reply(200);
  }
}
