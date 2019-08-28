/**
 * Augment the typings of Vue.js
 */

import Vue from "vue";
import PageManager from "./index";
import { PageManagerResult, PageManagerBlockIndex, PageManagerBlockName, PageManagerBlockPageType } from "./index";

declare module "vue/types/vue" {
  interface Vue {
    $pagemanager?: PageManager;
    $pageblock?: PageManagerResult;
    $blockName?: PageManagerBlockName;
    $blockIndex?: PageManagerBlockIndex;
    $blockResult?: PageManagerResult;
    $blockPageType?: PageManagerBlockPageType;
    $block?: any; // should be fixed later
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    pagemanager?: PageManager
  }
}
