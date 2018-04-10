/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue';
import { PageManager, PageManagerBlock } from './index';

declare module 'vue/types/vue' {
  interface Vue {
    $pagemanager: PageManager;
    $pageblock: PageManagerBlock;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    pagemanager?: PageManager
  }
}
