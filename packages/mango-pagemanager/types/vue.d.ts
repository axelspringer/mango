/**
 * Augment the typings of Vue.js
 */

import Vue from "vue";
import { PageManager, PageManagerResult } from "./index";

declare module "vue/types/vue" {
  interface Vue {
    $pagemanager?: PageManager;
    $pageblock?: PageManagerResult;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    pagemanager?: PageManager
  }
}
