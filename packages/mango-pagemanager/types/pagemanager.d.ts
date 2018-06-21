import Vue, { Component, ComponentOptions, PluginFunction, AsyncComponent } from "vue";

export type PageManagerMode = "STRICT"

export type PageManagerOptions = {
  blocks?: PageManagerOption[],
  mode?: PageManagerMode,
}

export type PageManagerResult = any[]

export type PageManagerBlockName = string
export type PageManagerBlockIndex = number
export type PageManagerBlockPageType = string

export type PageManagerBlock = {
  component: string;
  pageBlock: Component;
  result?: any[];
  page_type: string;
}

export type PageManagerOption = {
  component: Component;
  pageBlock: string;
}

export declare class PageManager {
  constructor(options?: PageManagerOptions);

  app: any;
  apps: Array<any>;
  mode: PageManagerMode;

  init(app: any): void;

  static install: PluginFunction<never>;
  static version: string;
}
